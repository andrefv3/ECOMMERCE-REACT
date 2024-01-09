export interface Product {
    productCode: number;
    reference: string;
    name: string;
    price: number;
    imageUrl: string;
    sizes: string[];
    colors: string[];
}

const products: Product[] = [
    { productCode: 11001, reference: "0115/019/800", name: "Sudadera Scarface negra", price: 199900, imageUrl: "https://static.pullandbear.net/2/photos//2024/V/0/2/p/8596/516/800/8596516800_2_6_1.jpg?t=1695631766956&amp;imwidth=750", sizes: ["xs", "s", "m", "l", "xl"], colors: ["Negro"] },
    { productCode: 11002, reference: "0234/056/123", name: "Camisa manga larga oxford rayas", price: 109900, imageUrl: "https://static.bershka.net/4/photos2/2023/I/0/2/p/6400/777/250/3c4d2c4b7d13a60cf790ccf390bf001b-6400777250_2_4_0.jpg", sizes: ["s", "m", "l"], colors: ["Rayas"] },
    { productCode: 11003, reference: "0456/789/432", name: "Hoodie Loose Fit", price: 84900, imageUrl: "https://hmcolombia.vtexassets.com/arquivos/ids/2815539-600-900?v=638235354321130000&width=600&height=900&aspect=true", sizes: ["xs", "s", "m", "l", "xl"], colors: ["Gris"] },
    { productCode: 11004, reference: "0789/012/765", name: "Camiseta Loose Fit", price: 49900, imageUrl: "https://hmcolombia.vtexassets.com/arquivos/ids/3250185-600-900?v=638352868825400000&width=600&height=900&aspect=true", sizes: ["s", "m", "xl"], colors: ["Blanco"] },
];

export default products;