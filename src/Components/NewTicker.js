import React from "react";
import Marquee from "react-fast-marquee";

function NewsTicker({ news }) {
    return (
        <Marquee gradient={false} speed={50}>
            {news.map((article, index) => (
                <span key={index} style={{ margin: "0 15px" }}>
                    {article.title}
                </span>
            ))}
        </Marquee>
    );
}

export default NewsTicker;
