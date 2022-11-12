import React from "react";
import { Col } from "react-bootstrap";
import gridStyles from "../styles/Grid.module.css";

interface GridItemProps {
    url: string;
}

const GridItem = (props: GridItemProps) => {
    return (
        <Col
            style={{
                outline: "3px solid gray",
                borderRadius: "30px",
                padding: "5px",
            }}
            align="center"
        >
            <img src={props.url} className={gridStyles.cellImage} />
        </Col>
    );
};

export default GridItem;
