import React from "react";


class Quote extends React.Component {
    state = {
        quote: null
    }
    componentDidMount() {
        import("inspirational-quotes").then(
            (Quotes) => {
                this.setState({ quote: Quotes.getQuote()})
            }
        ).catch(() => console.log("Nothing happen :( "))
    }
    render() {
        return (
            <React.Fragment>
                {this.state.quote ? 
                    <figure>
                        <blockquote>{this.state.quote.text}</blockquote>
                        <figcaption><cite>{this.state.quote.author}</cite></figcaption>
                    </figure>:
                    "..."
                }
            </React.Fragment>
        )
    }
}

export default Quote;