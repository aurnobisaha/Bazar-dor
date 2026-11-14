
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const products = [
    { id: 1, emoji: "🍚", name: "স্বর্ণমাছি চাল", price: 148, unit: "কেজি", dir: "up", pct: 2.1 },
    { id: 2, emoji: "🫘", name: "মসুর ডাল", price: 142, unit: "কেজি", dir: "up", pct: 2.9 },
    { id: 3, emoji: "🫙", name: "সরিষার তেল", price: 192, unit: "লিটার", dir: "up", pct: 2.1 },
    { id: 4, emoji: "🥔", name: "আলু", price: 30, unit: "কেজি", dir: "down", pct: 6.2 },
    { id: 5, emoji: "🧅", name: "পেঁয়াজ", price: 54, unit: "কেজি", dir: "up", pct: 12.5 },
    { id: 6, emoji: "🥚", name: "ডিম", price: 158, unit: "ডজন", dir: "up", pct: 3.9 },
];

const Marquee = () => {
    return (
        <div className="bg-white py-3 text-black border border-gray-300 overflow-hidden">
            <MarqueeText direction="right">
                <div className="flex items-center gap-10">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex items-center gap-2 whitespace-nowrap"
                        >
                            <span>{product.emoji}</span>
                            <span>{product.name}</span>
                            <span>
                                ৳{product.price}/{product.unit}
                            </span>
                            <span className={product.dir === "up" ? "text-red-400" : "text-green-400"}>
                                {product.dir === "up" ? "▲" : "▼"} {product.pct}%
                            </span>
                        </div>
                    ))}
                </div>
            </MarqueeText>
        </div>
    );
};

export default Marquee;

