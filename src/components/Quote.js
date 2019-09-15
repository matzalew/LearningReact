import React, { useState, useEffect } from "react";

const Quote = () => {
  const [quote, setQuote] = useState();

  useEffect(() => {
    import("inspirational-quotes")
      .then(Quotes => {
        setQuote(Quotes.getQuote());
      })
      .catch(() => console.log("Couldn't load quotes"));
  });

  return (
    <>
      {quote ? (
        <figure>
          <blockquote>{quote.text}</blockquote>
          <figcaption>
            <cite>{quote.author}</cite>
          </figcaption>
        </figure>
      ) : (
        "..."
      )}
    </>
  );
};

export default Quote;