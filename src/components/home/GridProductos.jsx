import { SimpleGrid } from "@chakra-ui/layout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeProduct, addFavProduct } from "../../actions/productAction";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { BiDollar } from "react-icons/bi";
import { AiTwotoneShop } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import { Fab } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
    },
    media: {
        height: 140,
    },
});

const GridProductos = ({ category, data }) => {
  const classes = useStyles();
  const alimento = data[0].food
  const accessories = data[1].accessories
  const toys = data[2].toys

    const auth = useSelector((state) => state.auth);
    const { favorite } = useSelector(state => state.products)
    const productos = [];

    alimento.map((p) => {
        productos.push(p);
    });

    accessories.map((p) => {
        productos.push(p);
    });

    toys.map((p) => {
        productos.push(p);
    });

    function shuffleArray(inputArray) {
        inputArray.sort(() => Math.random() - 0.5);
    }

    shuffleArray(productos);

    const dispatch = useDispatch();
    const handleClickProduct = (product) => {
        dispatch(
            activeProduct(product.id, {
                ...product,
            })
        );
    };

    const handleAddFavoriteP = (product) => {

        const found = favorite.find(element => element.name === product.name);

        if (found !== undefined) {
            alert('ya esta en favoritos')
        } else {
            dispatch(addFavProduct(product.img_url, product.name, product.price, product.description, product.brand))
        }
    }

    return (
        <SimpleGrid minChildWidth="250px" spacing="40px">
            {productos.map((m, index) => {
                return (
                    <Card
                        className={classes.root}
                        key={index}
                        onClick={() => {
                            handleClickProduct(m);
                        }}
                    >
                        <CardActionArea>
                            <Link to={`/detail/${index}`}>
                                <CardMedia
                                    className={classes.media}
                                    image={m.img_url}
                                    title={m.name}
                                />
                                <CardContent>
                                    <h3 style={{ fontSize: "23px" }}>{m.name}</h3>
                                    <div
                                        style={{
                                            display: "flex",
                                            fontSize: "20px",
                                            marginBottom: "5px",
                                            color: "rgba(0, 0, 0, 0.54)",
                                        }}
                                    >
                                        <BiDollar
                                            style={{ marginRight: "10px", marginTop: "5px" }}
                                        />
                                        {m.price}
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            fontSize: "15px",
                                            marginBottom: "5px",
                                            color: "rgba(0, 0, 0, 0.54)",
                                        }}
                                    >
                                        <AiTwotoneShop
                                            style={{ marginRight: "10px", marginTop: "5px" }}
                                        />
                                        {m.brand}
                                    </div>
                                    <h3 style={{ color: "#00a650" }}>Envio gratis</h3>
                                </CardContent>
                            </Link>
                            {
                                auth.name !== undefined
                                &&
                                <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "15px", paddingRight: "20px", position: "absolute", top: "0px", right: "0px", paddingTop: "5px" }}>
                                    <Fab color="secondary" aria-label="favorite" style={{ width: "40px", height: "40px" }} onClick={() => {
                                        handleAddFavoriteP(m);
                                    }}>
                                        <FaHeart style={{ fontSize: "20px" }} />
                                    </Fab>
                                </div>
                            }
                            {/* <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingLeft: "15px",
                                    paddingRight: "20px",
                                    position: "absolute",
                                    top: "120px",
                                    left: "0px",
                                }}
                            ><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//blog.hubspot.es/marketing/crear-enlaces-redes-sociales">
                                    <Fab
                                        aria-label="share"
                                        style={{ width: "40px", height: "40px" }}
                                    >
                                        <GrShareOption style={{ fontSize: "20px" }} />
                                    </Fab>
                                </a>
                            </div> */}
                        </CardActionArea>
                    </Card>
                );
            })}
        </SimpleGrid>
    );
};

export default GridProductos;
