exports.seed = function(knex) {
  // Inserts seed entries
  return knex('companies').insert([
    {
      name: 'Accenture',
      website: 'https://www.accenture.com.',
      location: 'Atlanta, GA',
      longitude: -85.0,
      latitude: 33.7537,
      type: 'Business',
      logo: '',
      description:
        'We partner with our clients to drive real innovation—the kind that turns an idea into an industry.',
    },
    {
      name: 'Anthem, Inc.',
      website: 'https://www.antheminc.com',
      location: 'Atlanta, GA',
      longitude: -84.5,
      latitude: 33.8,
      type: 'Health',
      logo: '',
      description:
        'Improving Lives and Communities. Simplifying Healthcare. Expecting More.',
    },
    {
      name: 'Ahalogy',
      website: 'https://www.ahalogy.com',
      location: 'Cincinnati, OH',
      longitude: -80,
      latitude: 31,
      type: 'Business',
      logo: '',
      description:
        'Ahalogy is the market leader in trend-driven influencer, content and social media marketing',
    },
    {
      name: 'Bad Rabbit',
      website: 'https://www.badrabbit.com',
      location: 'Portland, OR',
      longitude: -80,
      latitude: 31,
      type: 'Technology',
      logo: '',
      description:
        'At Bad Rabbit, we make the systems you have work better for you.',
    },
    {
      name: 'DoNotPay Inc',
      website: 'https://donotpay.com',
      location: 'Portland, OR',
      longitude: -80,
      latitude: 31,
      type: 'Technology',
      logo: '',
      description:
        'Fight corporations, beat bureaucracy and sue anyone at the press of a button.',
    },
    {
      name: 'Newfront Insurance',
      website: 'https://www.newfrontinsurance.com',
      location: 'San Francisco, CA',
      longitude: -80,
      latitude: 31,
      type: 'insurance',
      logo: '',
      description:
        "We're are a modern brokerage innovating on behalf of our client",
    },
    {
      name: 'Unspun',
      website: 'https://www.unspuntech.com/',
      location: 'San Francisco, CA',
      longitude: -80,
      latitude: 31,
      type: 'Commerce',
      logo: '',
      description:
        "digital customization, automated manufacturing customized denim like you've never seen before.",
    },
    {
      name: 'rideOS',
      website: 'https://rideos.ai',
      location: 'San Francisco, CA',
      longitude: -80,
      latitude: 31,
      type: 'Technology',
      logo: '',
      description:
        'Software to efficiently move people and things throughout the world',
    },
    {
      name: 'Lambda School',
      website: 'https://lambdaschool.com/',
      location: 'Silicon Valley, CA.',
      longitude: -80,
      latitude: 31,
      type: 'Software Education',
      logo: '',
      description:
        'Lambda School is your gateway to a new career in just 9 months. ',
    },
    {
      name: 'Paystack',
      website: 'https://paystack.com/',
      location: 'Lagos, NG',
      longitude: -80,
      latitude: 31,
      type: 'FinTech',
      logo: '',
      description:
        'Paystack helps businesses in Africa get paid by anyone, anywhere in the world',
    },
    {
      name: 'BuyCoins',
      website: 'https://buycoins.africa/',
      location: 'Lagos, NG',
      longitude: -80,
      latitude: 31,
      type: 'Crypto',
      logo: '',
      description:
        'The easiest way to buy and sell Bitcoin, Ethereum & Litecoin.',
    },
    {
      name: 'Chipper Cash',
      website: 'https://chippercash.com/',
      location: 'Lagos, NG',
      longitude: -80,
      latitude: 31,
      type: 'FinTech',
      logo: '',
      description:
        'Chipper is the largest mobile cross-border money transfer platform in Africa',
    },
    {
      name: 'Cowrywise',
      website: 'https://www.cowrywise.com/',
      location: 'Lagos, NG',
      longitude: -80,
      latitude: 31,
      type: 'FinTech',
      logo: '',
      description: 'Get your money working with impressive interest rates',
    },
  ]);
};
