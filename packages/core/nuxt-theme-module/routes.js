const path = require('path');

module.exports = function getRoutes(themeDir = __dirname) {
  return [{
    name: 'home',
    path: '/',
    component: path.resolve(themeDir, 'pages/Home.vue')
  },
  {
    name: 'community',
    path: '/community',
    component: path.resolve(themeDir, 'pages/Community.vue')
  },
  {
    name: 'join',
    path: '/join',
    component: path.resolve(themeDir, 'pages/Community.vue')
  },
  {
    name: 'joinanother',
    path: '/joinanother',
    component: path.resolve(themeDir, 'pages/Community.vue')
  },
  {
    name: 'connecting',
    path: '/connecting',
    component: path.resolve(themeDir, 'pages/Community.vue')
  },
  {
    name: 'sayhi',
    path: '/sayhi',
    component: path.resolve(themeDir, 'pages/Community.vue')
  },
  {
    name: 'thankyou',
    path: '/thankyou',
    component: path.resolve(themeDir, 'pages/Community.vue')
  },
  {
    name: 'product',
    path: '/p/:id/:slug/',
    component: path.resolve(themeDir, 'pages/Product.vue')
  },
  {
    name: 'category',
    path: '/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?',
    component: path.resolve(themeDir, 'pages/Category.vue')
  },
  {
    name: 'my-account',
    path: '/my-account/:pageName?',
    component: path.resolve(themeDir, 'pages/MyAccount.vue')
  },
  {
    name: 'checkout',
    path: '/checkout',
    component: path.resolve(themeDir, 'pages/Checkout.vue'),
    children: [
      {
        path: 'personal-details',
        name: 'personal-details',
        component: path.resolve(themeDir, 'pages/Checkout/PersonalDetails.vue')
      },
      {
        path: 'shipping',
        name: 'shipping',
        component: path.resolve(themeDir, 'pages/Checkout/Shipping.vue')
      },
      {
        path: 'payment',
        name: 'payment',
        component: path.resolve(themeDir, 'pages/Checkout/Payment.vue')
      },
      {
        path: 'order-review',
        name: 'order-review',
        component: path.resolve(themeDir, 'pages/Checkout/OrderReview.vue')
      },
      {
        path: 'thank-you',
        name: 'thank-you',
        component: path.resolve(themeDir, 'pages/Checkout/ThankYou.vue')
      }
    ]
  }
  ];
};
