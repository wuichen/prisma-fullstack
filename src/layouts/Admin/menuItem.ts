import { MenuItemType } from 'oah-ui';

export const CompanyMenu = [{
  title: 'Walkthrough',
  icon: { name: 'corner-down-right-outline' },
  link: { href: '/admin/dashboard/walkthrough' }
},
{
  title: 'Catalog',
  icon: { name: 'grid-outline' },
  children: [
    { title: 'Products', link: { href: '/admin/models/Product' } },
    {
      title: 'Categories',
      link: { href: '/admin/models/Category' },
    },
  ],
}, {
  title: 'Sales',
  icon: { name: 'grid-outline' },
  children: [
    { title: 'Orders', link: { href: '/admin/models/Order' } },
    {
      title: 'Invoices',
      link: { href: '/admin/models/Invoice' },
    },
  ],
}]

const items: MenuItemType[] = [...CompanyMenu,
{ title: 'Role Settings', icon: { name: 'settings-2-outline' }, link: { href: '/admin/role/settings' } },
  // {
  //   title: 'Models',
  //   icon: { name: 'layers-outline' },
  //   children: [
  //     { title: 'Users', link: { href: '/admin/models/User' } },
  //     {
  //       title: 'Posts',
  //       link: { href: '/admin/models/Post' },
  //     },
  //     {
  //       title: 'Comments',
  //       link: { href: '/admin/models/Comment' },
  //     },
  //     {
  //       title: 'Groups',
  //       link: { href: '/admin/models/Group' },
  //     },
  //   ],
  // },
];
export default items;