import { PrismaClient, raw } from '@prisma/client';
import dataGenerator from './index';
import { Categories } from 'containers/ProductDetailsFood/ProductDetailsFood.style';
import { randomDate, randomFloat, weightedArrayElement, weightedBoolean } from './utils';
import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import { random, lorem } from 'faker/locale/en';
import isAfter from 'date-fns/is_after';
import path from 'path'
import fs from 'fs'
const data = dataGenerator();
const db = {
  users: [],
  countries: [],
  platforms: [],
  companies: [],
  customers: [],
  products: [],
  categories: [],
  staffs: [],
  contacts: [],
  orders: [],
  roles: []
};
const prisma = new PrismaClient();
const rawData = fs.readFileSync(path.join(__dirname, '../schema.json'));

const generateDefaultUI = (modifiedData) => {
  for (let y = 0; y < modifiedData.models.length; y++) {
    let model = modifiedData.models[y];

    // this is to change display from id to name or firstname/lastname
    let displayFields = []
    if (model.fields.find((field) => field.name === 'name')) {
      displayFields = ['name']
    } else if (model.fields.find((field) => field.name === 'firstName')) {
      displayFields.unshift('firstName')
    } else if (model.fields.find((field) => field.name === 'lastName')) {
      displayFields.push('lastName')
    } else {
      displayFields = ['id']
    }

    model.displayFields = displayFields

    // this is for hiding id columns in front end
    for (let z = 0; z < model.fields.length; z++) {
      let field = model.fields[z];
      if (field.name != 'id' && field.name.endsWith('Id')) {
        field.read = false
      }
    }
  }
  return modifiedData
}

const generateCompanyUI = (modifiedData) => {
  for (let y = 0; y < modifiedData.models.length; y++) {
    let model = modifiedData.models[y];
    // this is for hiding id columns in front end
    for (let z = 0; z < model.fields.length; z++) {
      let field = model.fields[z];
      if (field.name === 'company') {
        field.read = false
      }
    }
  }
  return modifiedData
}

async function seedData() {
  await prisma.connect();

  if (data.roles) {
    for (let index = 0; index < data.roles.length; index++) {
      const element = data.roles[index];
      let modifiedData = JSON.parse(rawData)
      let schemaString
      switch (element.name) {
        case 'DEFAULT_SCHEMA':
          schemaString = JSON.stringify(modifiedData)
          break;
        case 'COMPANY_ADMIN':
          modifiedData = generateDefaultUI(modifiedData)
          modifiedData = generateCompanyUI(modifiedData)
          schemaString = JSON.stringify(modifiedData)
          console.log(schemaString)
          break;
        default:
          modifiedData = generateDefaultUI(modifiedData)
          schemaString = JSON.stringify(modifiedData)
          break;
      }

      element.schema = schemaString
      const role = await prisma.role.create({
        data: element,
      });
      db.roles.push(role);
    }
  }

  if (data.countries) {
    for (let index = 0; index < data.countries.length; index++) {
      const element = data.countries[index];
      // try {
      const country = await prisma.country.create({
        data: element,
      });
      db.countries.push(country);
      // } catch (err) {
      //   console.log(element);
      //   console.log(err);
      // }
    }
  }
  if (data.users) {
    for (let index = 0; index < data.users.length; index++) {
      let element = data.users[index];
      // if (index === 0) {
      //   element.id = 'smdFe5UxjRU12AMQeGQDsCAQnLJ2';
      // } else {
      //   element.id = element.firstName + Math.floor(Math.random() * 1000).toString();
      // }
      try {
        const user = await prisma.user.create({
          data: element,
        });
        db.users.push(user);
      } catch (err) {
        console.log(element);
        console.log(err);
      }
    }
  }
  if (data.platforms) {
    for (let index = 0; index < data.platforms.length; index++) {
      const element = data.platforms[index];
      // try {
      const platform = await prisma.platform.create({
        data: {
          ...element,
          country: {
            connect: {
              id: db.countries[Math.floor(Math.random() * db.countries.length)].id,
            },
          },
          owner: {
            connect: {
              id: db.users[Math.floor(Math.random() * db.users.length)].id,
            },
          },
        },
      });
      db.platforms.push(platform);
      // } 
      // catch (err) {
      //   console.log(element);
      //   console.log(err);
      // }
    }
  }

  if (data.categories) {
    for (let index = 0; index < data.categories.length; index++) {
      const element = data.categories[index];
      element.slug = element.slug + element.id;
      delete element.id;
      const children = element.children.map((child) => {
        child.slug = child.slug + child.id;
        delete child.id;

        return {
          ...child,
          platform: {
            connect: {
              slug: child.type,
            },
          },
        };
      });
      // try {
      const category = await prisma.category.create({
        data: {
          ...element,
          platform: {
            connect: {
              slug: element.type,
            },
          },
          children: {
            create: children,
          },
        },
        include: {
          children: true,
        },
      });
      db.categories.push(category);
      for (let index = 0; index < category.children.length; index++) {
        const child = category.children[index];
        db.categories.push(child);
      }
      // } catch (err) {
      //   console.log(element, children);
      //   console.log(err);
      // }
    }
  }

  // generate restaurant type companies
  if (data.companies) {
    for (let index = 0; index < data.companies.length; index++) {
      const element = data.companies[index];
      const categories = [];
      for (let j = 0; j < element.categories.length; j++) {
        const category = element.categories[j];
        const existItem = db.categories.find((existCategory) => {
          // console.log(existCategory.slug, category)
          return existCategory.slug.includes(category)
        });
        if (existItem) {
          categories.push({ slug: existItem.slug });
        }
      }
      const ownerId = db.users[Math.floor(Math.random() * db.users.length)].id;
      // try {
      const company = await prisma.company.create({
        data: {
          ...element,
          platform: {
            connect: {
              slug: element.platformSlug,
            },
          },
          deliveryDetail: JSON.stringify(element.deliveryDetail),
          categories: {
            connect: categories,
          },
          address: {
            create: {
              type: 'Company',
              name: `${element.name}'s address`,
              info: element.address,
            },
          },
          products: {
            create: element.products.map((product) => {
              product.slug =
                product.name.replace(' ', '-').toLowerCase() +
                '-' +
                product.id +
                Math.floor(Math.random() * 1000).toString();
              delete product.id;
              return product;
            }),
          },
          staffs: {
            create: [
              {
                role: {
                  connect: {
                    name: 'COMPANY_ADMIN',
                  },
                },
                user: {
                  connect: {
                    id: ownerId,
                  },
                },
              },
            ],
          },
          owner: {
            connect: {
              id: ownerId,
            },
          },
        },
        include: {
          products: true,
          platform: true,
          staffs: true,
        },
      });
      for (let index = 0; index < company.products.length; index++) {
        const product = company.products[index];
        db.products.push(product);
      }
      db.companies.push(company);
      // } catch (err) {
      //   console.log(element);
      //   console.log(err);
      // }
    }
  }

  if (data.products) {
    for (let index = 0; index < data.products.length; index++) {
      const element = data.products[index];
      element.slug = element.slug + element.id + Math.floor(Math.random() * 1000).toString();
      const categories = [];
      delete element.id;
      delete element.author;
      delete element.meta;
      for (let s = 0; s < element.categories.length; s++) {
        const category = element.categories[s];
        for (let a = 0; a < db.categories.length; a++) {
          const dbCategory = db.categories[a];
          if (
            // dbCategory.type === category.type &&
            dbCategory.slug.includes(category.slug)
          ) {
            categories.push({
              slug: dbCategory.slug,
            });
          }
        }
      }
      const company = createOrConnectCompany(element);
      const mutation = {
        data: {
          ...element,
          categories: {
            connect: categories,
          },
          gallery: {
            set: element.gallery.map((image) => {
              return image.url;
            }),
          },
        },
        include: {
          company: true,
        },
      };
      if (company) {
        mutation.data.company = company;
      }
      // try {
      const product = await prisma.product.create(mutation);
      if (!!company.create) {
        const inputCompany = await prisma.company.findOne({
          where: {
            id: product.company.id,
          },
          include: {
            products: true,
            platform: true,
          },
        });
        db.companies.push(inputCompany);
      }
      db.products.push(product);
      // } catch (err) {
      //   console.log(element, company);
      //   console.log(err);
      // }
    }
  }

  if (data.staffs) {
    for (let index = 0; index < data.staffs.length; index++) {
      const element = data.staffs[index];
      const contactNumber = element.contactNumber;
      delete element.contactNumber;
      // try {
      const staff = await prisma.staff.create({
        data: {
          ...element,
          user: {
            create: {
              // id: element.firstName + Math.floor(Math.random() * 1000).toString(),
              email: element.email,
              firstName: element.firstName,
              lastName: element.lastName,
            },
          },
          role: {
            connect: {
              name: element.role
            }
          },
          contact: {
            create: {
              number: contactNumber,
              type: 'company',
            },
          },
          company: {
            connect: {
              id: db.companies[Math.floor(Math.random() * db.companies.length)].id,
            },
          },
        },
        include: {
          user: true,
          contact: true,
        },
      });
      db.contacts.push(staff.contact);
      db.users.push(staff.user);
      db.staffs.push(staff);
      // } catch (err) {
      //   console.log(element);
      //   console.log(err);
      // }
    }
  }

  if (data.customers) {
    for (let index = 0; index < data.customers.length; index++) {
      const element = data.customers[index];
      // try {
      const customer = await prisma.customer.create({
        data: {
          ...element,
          user: {
            create: {
              // id: element.firstName + Math.floor(Math.random() * 1000).toString(),
              email: element.email,
              firstName: element.firstName,
              lastName: element.lastName,
            },
          },
          company: {
            connect: {
              id: db.companies[Math.floor(Math.random() * db.companies.length)].id,
            },
          },
        },
        include: {
          user: true,
          company: true,
        },
      });
      db.users.push(customer.user)
      db.customers.push(customer);
      // } catch (err) {
      //   console.log(element);
      //   console.log(err);
      // }
    }
  }

  for (let d = 0; d < db.customers.length; d++) {
    const customer = db.customers[d];
    const customerCompany = customer.company;
    const company = db.companies.find((company) => customerCompany.slug === company.slug);
    const taxRate = company.platform.taxRate;

    if (customer.hasOrdered) {
      const randomOrderCount = Math.floor(Math.random() * 10);
      const randomProductCount = Math.floor(Math.random() * 10) + 1;
      const orderItems = [];
      for (let v = 0; v < randomProductCount; v++) {
        const product = company.products[Math.floor(Math.random() * company.products.length)];
        const quantity = Math.floor(Math.random() * 10);
        orderItems.push({
          product: {
            connect: {
              id: product.id,
            },
          },
          price: product.price,
          quantity,
        });
      }

      const subtotal = orderItems.reduce((acc, orderItem) => {
        return acc + orderItem.price * orderItem.quantity;
      }, 0);
      const deliveryFees = randomFloat(3, 8);
      const taxes = (subtotal + deliveryFees) * taxRate;
      const total = subtotal + deliveryFees + taxes;

      const today = new Date();

      const aMonthAgo = subDays(today, 30);

      const date = randomDate(customer.firstSeen, customer.lastSeen);
      const deliveryTime = addDays(date, 1);

      const status =
        isAfter(date, aMonthAgo) && random.boolean()
          ? 'ordered'
          : weightedArrayElement(['delivered', 'cancelled'], [10, 1]);

      const reviewStatus = isAfter(aMonthAgo, date)
        ? weightedArrayElement(['accepted', 'rejected'], [3, 1])
        : weightedArrayElement(['pending', 'accepted', 'rejected'], [5, 3, 1]);
      const rating = random.number({ min: 1, max: 5 });
      const comment = Array.apply(null, Array(random.number({ min: 1, max: 5 })))
        .map(() => lorem.sentences())
        .join('\n \r');
      const mutation = {
        data: {
          customer: {
            connect: {
              id: customer.id,
            },
          },
          orderItems: {
            create: orderItems,
          },
          subtotal,
          deliveryFees,
          taxRate,
          taxes,
          total,
          status,
          company: {
            connect: {
              id: company.id,
            },
          },
          deliveryTime,
          createdAt: date,
          paymentMethod: 'Card',
          deliveryAdress: {
            create: {
              type: 'Sales',
              info: customer.address,
              name: `${customer.firstName}'s address`,
            },
          },
        },
      };
      if (status === 'delivered') {
        mutation.data.reviews = {
          create: {
            status: reviewStatus,
            rating,
            comment,
            product: {
              connect: {
                id: orderItems[Math.floor(Math.random() * orderItems.length)].product.connect.id,
              },
            },
            company: {
              connect: {
                id: company.id,
              },
            },
            customer: {
              connect: {
                id: customer.id,
              },
            },
          },
        };
      } else {
        mutation.data.invoice = {
          create: {
            subtotal,
            deliveryFees,
            taxRate,
            taxes,
            total,
            customer: {
              connect: {
                id: customer.id,
              },
            },
            company: {
              connect: {
                id: company.id,
              },
            },
            createdAt: date,
          },
        };
      }
      const order = await prisma.order.create(mutation);
    }
  }

  await prisma.disconnect();
  return;
}

const createOrConnectCompany = (product) => {
  let company = null;
  let count = 0;

  let companiesInPlatform = [];

  const categories = [];

  for (let index = 0; index < db.companies.length; index++) {
    const company = db.companies[index];
    if (company.platformSlug === product.type) {
      count++;
      companiesInPlatform.push(company);
    }
  }
  if (product.type !== 'restaurant') {
    if (count < 1) {
      const ownerId = db.users[Math.floor(Math.random() * db.users.length)].id
      company = {
        create: {
          platform: {
            connect: {
              slug: product.type,
            },
          },
          deliveryDetail: JSON.stringify({
            charge: 'Free',
            minimumOrder: 50,
            isFree: true,
          }),
          staffs: {
            create: [{
              user: {
                connect: {
                  id: ownerId
                }
              },
              role: {
                connect: {
                  name: 'COMPANY_ADMIN'
                }
              }
            }]
          },
          name: `A ${product.type} company`,
          description: `A ${product.type} company description`,
          platformSlug: product.type,
          slug: `${product.type}-company-${Math.floor(Math.random() * 1000).toString()}`,
          // categories: {
          //   connect: product.categories.map((category) => {
          //     return { slug: category.slug }
          //   }),
          // },
          owner: {
            connect: {
              id: ownerId,
            },
          },
        },
      };
    } else {
      company = {
        connect: {
          id: companiesInPlatform[Math.floor(Math.random() * companiesInPlatform.length)].id,
        },
      };
    }
  } else {
    company = {
      connect: {
        id: companiesInPlatform[Math.floor(Math.random() * companiesInPlatform.length)].id,
      },
    };
  }
  return company;
};

seedData();
