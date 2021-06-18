import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FiMapPin } from 'react-icons/fi'
import { IoEarth } from 'react-icons/io5'
import { FaPhoneAlt } from 'react-icons/fa'
import { LoadApiProducts } from '../../api/LoadApiProducts';
import { Spinner } from '@chakra-ui/react';

const StyledDivMap = styled.div`
  padding-left: 6% !important;
  padding-top: 6% !important;
`;
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});
const Carga = styled(Spinner)`
     display:block;
     margin-left:auto;
     margin-right:auto;
`

const dataShops = [
    {
        coordenadas: [6.256866693500489, -75.59602461491339],
        image:
            "https://lh6.googleusercontent.com/proxy/bCkvPk-S3RETF5QdEJFXWicdhoP8XpYtINICBcqKT0Ljx3EwfzDvh1kejNKdlgoPjPeWsHlRPpp0l0AjJEjlFGr0RFeGcWrDLYe2N9sHYnMXC2Ok09UsRqUK525FmWUDxcDgAUxgfv0OmKtxKAWsl87EHJMA35glPoQYKvcxo1Wx=w262-h104-p-k-no",
        title: "Tierra de gatos",
        direccion: "Cra. 78 ##47-24, Medellín, Antioquia",
        phone: "+573015858593",
        web: "https://tierradegatos.com",
    },
    {
        coordenadas: [6.171669866106178, -75.60210186535102],
        image:
            "https://lh5.googleusercontent.com/p/AF1QipNlfqpdel8-BuXOEwQB-kmXvQeORDR1Ej_ZbA1c=w262-h104-p-k-no",
        title: "Mirringa Mirronga",
        direccion: "Cra. 42 ## 54A-155, Itagüi, Antioquia",
        phone: "+573106212052",
        web: "http://www.mirringamirronga.com/",
    },
];

const Maps = () => {
    const classes = useStyles();
    const tiendas = LoadApiProducts('https://sajoma.herokuapp.com/stores')
    if (tiendas === undefined) {
        return (
            <div>
                <Carga animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Carga>
            </div>
        )
    }
    // `[${tienda.latitude}, ${tiendas.longitude}]`
    return (
        <StyledDivMap>
            <Map center={[6.256866693500489, -75.59602461491339]} zoom={12} >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {tiendas.map((tienda, index) => {
                    console.log(tienda.website);
                    return (
                        <Marker position={[tienda.latitude, tienda.longitude]} key={index}>
                            <Popup>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={tienda.img_url}
                                            title={tienda.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {tienda.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {
                                                    tienda.province &&
                                                    <div style={{ display: "flex" }}>
                                                        <FiMapPin style={{ marginRight: "10px", marginTop: "5px" }} />{tienda.province} {tienda.city} {tienda.address}
                                                    </div>
                                                }
                                                {
                                                    tienda.telephone && <div style={{ display: "flex" }}>
                                                        <FaPhoneAlt style={{ marginRight: "10px", marginTop: "5px" }} />{tienda.telephone}
                                                    </div>
                                                }
                                                {
                                                    tienda.website && <div style={{ display: "flex" }}>
                                                        <IoEarth style={{ marginRight: "10px", marginTop: "5px" }} /><a href={`https://${tienda.website}`} target="_blank">Sitio web</a>
                                                    </div>
                                                }

                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    {/* <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions> */}
                                </Card>
                            </Popup>
                        </Marker>
                    );
                })}
            </Map>
        </StyledDivMap>
    );
};

export default Maps;
