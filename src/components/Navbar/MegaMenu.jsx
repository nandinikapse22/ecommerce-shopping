import { Link } from 'react-router-dom';
import './MegaMenu.css';

// Menu data for each category
const menuData = {
  Women: [
    {
      title: 'Ethnic Wear',
      links: ['Sarees', 'Kurtas', 'Lehengas', 'Salwar Suits', 'Ethnic Sets']
    },
    {
      title: 'Western Wear',
      links: ['Dresses', 'Tops', 'Jeans', 'Skirts', 'Co-ord Sets']
    },
    {
      title: 'Footwear',
      links: ['Heels', 'Flats', 'Sneakers', 'Boots', 'Sandals']
    },
    {
      title: 'Accessories',
      links: ['Bags', 'Jewellery', 'Watches', 'Sunglasses', 'Belts']
    },
    {
      title: 'Beauty',
      links: ['Makeup', 'Skincare', 'Haircare', 'Fragrances', 'Wellness']
    }
  ],
  Men: [
    {
      title: 'Top Wear',
      links: ['T-Shirts', 'Shirts', 'Polos', 'Jackets', 'Sweaters']
    },
    {
      title: 'Bottom Wear',
      links: ['Jeans', 'Trousers', 'Shorts', 'Cargo', 'Track Pants']
    },
    {
      title: 'Footwear',
      links: ['Sneakers', 'Formal Shoes', 'Casual Shoes', 'Sports Shoes', 'Sandals']
    },
    {
      title: 'Accessories',
      links: ['Watches', 'Belts', 'Wallets', 'Bags', 'Sunglasses']
    },
    {
      title: 'Ethnic Wear',
      links: ['Kurtas', 'Sherwanis', 'Nehru Jackets', 'Dhotis', 'Ethnic Sets']
    }
  ],
  Cosmetics: [
    {
      title: 'Makeup',
      links: ['Face', 'Eyes', 'Lips', 'Brushes', 'Palettes']
    },
    {
      title: 'Skincare',
      links: ['Cleansers', 'Moisturizers', 'Serums', 'Masks', 'Sunscreens']
    },
    {
      title: 'Haircare',
      links: ['Shampoos', 'Conditioners', 'Hair Oils', 'Styling', 'Treatments']
    },
    {
      title: 'Fragrances',
      links: ['Perfumes', 'Body Mists', 'Deodorants', 'Gift Sets', 'Roll-ons']
    },
    {
      title: 'Tools',
      links: ['Brushes', 'Sponges', 'Mirrors', 'Organizers', 'Cases']
    }
  ],
  Accessories: [
    {
      title: 'Bags',
      links: ['Handbags', 'Backpacks', 'Totes', 'Clutches', 'Sling Bags']
    },
    {
      title: 'Jewellery',
      links: ['Necklaces', 'Earrings', 'Bracelets', 'Rings', 'Anklets']
    },
    {
      title: 'Watches',
      links: ['Analog', 'Digital', 'Smart Watches', 'Luxury', 'Sports']
    },
    {
      title: 'Eyewear',
      links: ['Sunglasses', 'Reading Glasses', 'Computer Glasses', 'Frames', 'Contact Lenses']
    },
    {
      title: 'More',
      links: ['Belts', 'Scarves', 'Hats', 'Socks', 'Hair Accessories']
    }
  ]
};

const getWomenRoute = (link) => {
  const map = {
    Sarees: '/women/ethnic-wear/saree',
    Kurtas: '/women/ethnic-wear/kurti',
    Lehengas: '/women/ethnic-wear/lehenga',
    'Salwar Suits': '/women/ethnic-wear',
    'Ethnic Sets': '/women/ethnic-wear',
    Dresses: '/women/western-wear/dresses',
    Tops: '/women/western-wear/tops',
    Skirts: '/women/western-wear/skirts',
    Jeans: '/women/western-wear/jeans',
    'Co-ord Sets': '/women/western-wear/co-ord-sets',
    Makeup: '/women/beauty/makeup',
    Skincare: '/women/beauty/skincare',
    Haircare: '/women/beauty/haircare',
    Fragrances: '/women/beauty/fragrances',
    Wellness: '/women/beauty/skincare',
    Bags: '/women/accessories/bags',
    Jewellery: '/women/accessories/jewellery',
    Watches: '/women/accessories/watches',
    Sunglasses: '/women/accessories/sunglasses',
    Belts: '/women/accessories/belts',
  };
  return map[link] || `/women/${link.toLowerCase().replace(/\s+/g, '-')}`;
};

const getMenRoute = (link) => {
  const map = {
    'T-Shirts': '/men/top-wear',
    Shirts: '/men/top-wear',
    Polos: '/men/top-wear',
    Jackets: '/men/top-wear',
    Sweaters: '/men/top-wear',
    Jeans: '/men/bottom-wear',
    Trousers: '/men/bottom-wear',
    Shorts: '/men/bottom-wear',
    Cargo: '/men/bottom-wear',
    'Track Pants': '/men/bottom-wear',
    Sneakers: '/men/footwear',
    'Formal Shoes': '/men/footwear',
    'Casual Shoes': '/men/footwear',
    'Sports Shoes': '/men/footwear',
    Sandals: '/men/footwear',
    Watches: '/men/accessories',
    Belts: '/men/accessories',
    Wallets: '/men/accessories',
    Bags: '/men/accessories',
    Sunglasses: '/men/accessories',
    Kurtas: '/men/ethnic-wear',
    Sherwanis: '/men/ethnic-wear',
    'Nehru Jackets': '/men/ethnic-wear',
    Dhotis: '/men/ethnic-wear',
    'Ethnic Sets': '/men/ethnic-wear',
  };
  return map[link] || '/men';
};

const getCosmeticsRoute = (link) => {
  const map = {
    Face: '/cosmetics/makeup',
    Eyes: '/cosmetics/makeup',
    Lips: '/cosmetics/makeup',
    Brushes: '/cosmetics/makeup',
    Palettes: '/cosmetics/makeup',
    Cleansers: '/cosmetics/skincare',
    Moisturizers: '/cosmetics/skincare',
    Serums: '/cosmetics/skincare',
    Masks: '/cosmetics/skincare',
    Sunscreens: '/cosmetics/skincare',
    Shampoos: '/cosmetics/haircare',
    Conditioners: '/cosmetics/haircare',
    'Hair Oils': '/cosmetics/haircare',
    Styling: '/cosmetics/haircare',
    Treatments: '/cosmetics/haircare',
    Perfumes: '/cosmetics/fragrances',
    'Body Mists': '/cosmetics/fragrances',
    Deodorants: '/cosmetics/fragrances',
    'Gift Sets': '/cosmetics/fragrances',
    'Roll-ons': '/cosmetics/fragrances',
    Sponges: '/cosmetics/makeup',
    Mirrors: '/cosmetics/makeup',
    Organizers: '/cosmetics/makeup',
    Cases: '/cosmetics/makeup',
  };
  return map[link] || '/cosmetics';
};

const getAccessoriesRoute = (link) => {
  const map = {
    Handbags: '/accessories/bags',
    Backpacks: '/accessories/bags',
    Totes: '/accessories/bags',
    Clutches: '/accessories/bags',
    'Sling Bags': '/accessories/bags',
    Necklaces: '/accessories/jewellery',
    Earrings: '/accessories/jewellery',
    Bracelets: '/accessories/jewellery',
    Rings: '/accessories/jewellery',
    Anklets: '/accessories/jewellery',
    Analog: '/accessories/watches',
    Digital: '/accessories/watches',
    'Smart Watches': '/accessories/watches',
    Luxury: '/accessories/watches',
    Sports: '/accessories/watches',
    Sunglasses: '/accessories/sunglasses',
    'Reading Glasses': '/accessories/sunglasses',
    'Computer Glasses': '/accessories/sunglasses',
    Frames: '/accessories/sunglasses',
    'Contact Lenses': '/accessories/sunglasses',
    Belts: '/accessories/belts',
    Scarves: '/accessories',
    Hats: '/accessories',
    Socks: '/accessories',
    'Hair Accessories': '/accessories/hair-accessories',
  };
  return map[link] || '/accessories';
};

const getMenuRoute = (category, link) => {
  if (category === 'Women') return getWomenRoute(link);
  if (category === 'Men') return getMenRoute(link);
  if (category === 'Cosmetics') return getCosmeticsRoute(link);
  if (category === 'Accessories') return getAccessoriesRoute(link);
  return '/';
};

const MegaMenu = ({ category, isActive }) => {
  const categories = menuData[category];

  if (!categories) return null;

  return (
    <div className={`mega-menu ${isActive ? 'active' : ''}`}>
      <div className="mega-menu-container">
        {categories.map((column, index) => (
          <div className="mega-menu-column" key={index}>
            <h3 className="mega-menu-title">{column.title}</h3>
            <ul className="mega-menu-links">
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link to={getMenuRoute(category, link)}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
