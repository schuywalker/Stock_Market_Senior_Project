import { ReactNode } from "react";
import "./Card.css";

interface CardProps {
    className: string;
    children: ReactNode; //https://blog.logrocket.com/using-react-children-prop-with-typescript/
}

const Card: React.FC<CardProps> = (props, ChildProps) => {
    const classes = "card " + props.className;
    return <div className={classes}>{props.children}</div>;
};
export default Card;
