export interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  desc: string;
  stock: number;
  category: string;
}

export const products: Product[] = [
  { id: 1, sku: 'BRAKE-101', name: 'Premium Brake Pads', price: 1999, desc: 'High-friction ceramic brake pads for superior stopping power', stock: 120, category: 'Brakes' },
  { id: 2, sku: 'OIL-20W50', name: 'Engine Oil 20W-50 (4L)', price: 899, desc: 'High performance synthetic oil for all engines', stock: 300, category: 'Fluids' },
  { id: 3, sku: 'FILTER-A1', name: 'Air Filter A1', price: 499, desc: 'Long-life air filter for improved airflow', stock: 250, category: 'Filters' },
  { id: 4, sku: 'SPARK-5', name: 'Spark Plugs (Set of 4)', price: 699, desc: 'Iridium spark plugs for better ignition', stock: 180, category: 'Engine' },
  { id: 5, sku: 'BAT-55AH', name: 'Car Battery 55Ah', price: 5599, desc: 'Maintenance-free battery with 3-year warranty', stock: 40, category: 'Electrical' },
  { id: 6, sku: 'TIRES-185', name: 'All-season Tire 185/65R15', price: 3999, desc: 'Comfort ride with long tread life', stock: 80, category: 'Tires' },
  { id: 7, sku: 'HEADLAMP-LED', name: 'LED Headlamp Kit', price: 2499, desc: 'Brighter white LED kit, plug & play installation', stock: 90, category: 'Lighting' },
  { id: 8, sku: 'OIL-FILTER', name: 'Oil Filter OF-22', price: 299, desc: 'High-flow spin-on filter for cleaner oil', stock: 400, category: 'Filters' },
];
