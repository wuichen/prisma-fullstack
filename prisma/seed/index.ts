import generateUsers from './user';
import generateCountries from './country';
import generatePlatforms from './platform';
import generateCompanies from './company';
import generateStaffs from './staff';
import generateCategories from './category';
import generateProducts from './product';
import generateCustomers from './customer';
import generateRoles from './role';

export default () => {
  const db: any = {};
  db.users = generateUsers();
  db.countries = generateCountries();
  db.roles = generateRoles();
  db.platforms = generatePlatforms();
  db.companies = generateCompanies();
  db.categories = generateCategories();
  db.staffs = generateStaffs();
  db.products = generateProducts();
  db.customers = generateCustomers(db, { serializeDate: false });
  return db;
};
