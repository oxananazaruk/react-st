import {Component} from "react";

const Button =({value, onUpdate})=> {
  return <button onClick={onUpdate}> Click: {value} </button>
};

export class Basics extends Component {
    state = {
        clicksA: 0,
        clicksB: 0,
    }

    // increment = () => {
    //     this.setState(prevState => {
    //         //  console.log("prevState", prevState);
    //         return {
    //             clicks: prevState.clicks + 1
    //         }
    //     })
    // }

    // decrement = () => {
    //     this.setState(prevState => {
    //         return {
    //             clicks: prevState.clicks - 1
    //         }
    //     })
    // }

    updateA = () => {
        this.setState(prevState => {
            return {
                clicksA: prevState.clicksA + 1
            }
        })
    }

    updateB = () => {
        this.setState(prevState => {
            return {
                clicksB: prevState.clicksB + 1
            }
        })
    }

    render() {
        const { clicksA, clicksB } = this.state;
        const total = clicksA + clicksB
        return (
        <>
            {clicksA > 0 && <p>A={clicksA}</p>}
                <p>B={clicksB}</p>
                <p>Total= {total }</p>
        <Button value={clicksA} onUpdate={this.updateA } />
        <Button value={clicksB} onUpdate={this.updateB } />
        </>
    )
        };
};

