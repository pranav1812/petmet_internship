import React, { useEffect, useState } from "react";
import RoundCard from "./RoundCard";
import SquareCard from "./SquareCard";
//import Navbar from "../../navbar.js";
import "./dashboard.css";
import TopCarousel from "./TopCarousel";
import BestSellers from "./BestSellers.js";
//import AppBar from "@material-ui/core/AppBar";
import { FooterContainer } from "../footer/containers/footer";
//import catessentials from "../pictures/image 3.png";
//import harness from "../pictures/image 4.png";
//import grooming from "../pictures/image 5.png";
import {Router, Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/Button'
//import food from "../pictures/image 6.png";
import {db} from '../../firebase'

import { db } from "../../firebase";

const styles = {
  carouselroot: {
    padding: " 0px !important",
  },
};

const DashboardClient = () => {
  const [categories, setCategories] = useState(null);
  const [bestSellers, setBestSellers] = useState(null);
  const [accessories, setAccessories] = useState(null);
  const [toys, setToys] = useState(null);
  useEffect(() => {
    db.collection("items")
      .get()
      .then((docs) => {
        console.log(docs.length);
        var temp = [];
        docs.forEach((doc) => {
          if (
            doc.id != "Best Sellers" &&
            doc.id != "Accessories" &&
            doc.id != "Special Toys"
          ) {
            temp.push({ name: doc.id, img: doc.data().img });
          }
        });
        setCategories(temp);
      })
      .catch((e) => console.log(e));

    db.collection("items")
      .doc("Best Sellers")
      .collection("products")
      .get()
      .then((docs) => {
        var temp = [];
        docs.forEach((doc) => temp.push(doc.data()));
        setBestSellers(temp);
      })
      .catch((e) => console.log(e));

    db.collection("items")
      .doc("Accessories")
      .collection("products")
      .get()
      .then((docs) => {
        var temp = [];
        docs.forEach((doc) => temp.push(doc.data()));
        setAccessories(temp);
      })
      .catch((e) => console.log(e));

    db.collection("items")
      .doc("Special Toys")
      .collection("products")
      .get()
      .then((docs) => {
        var temp = [];
        docs.forEach((doc) => temp.push(doc.data()));
        setToys(temp);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      {/* <Navbar /> */}
      <div className="carouselandcards">
        <div
          style={{ padding: "0 !important" }}
          className="carousel"
          className={styles.carouselroot}
        >
          <TopCarousel />
        </div>
        <h4 style={{ width: "100%" }} className="topbanner">
          Shop for Rs2000 and get a voucher worth Rs345
        </h4>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
  <Link to='/Addpet/'><Button>Add Pet</Button></Link>
  <Link to='/Appointment/'><Button>Appointment</Button> </Link>
</ButtonGroup>

          <Link to='/ShopProducts/' >
        <div className="cards">
          { 
            categories? categories.map(cat=><RoundCard title={cat.name} image={cat.img} />): null
            }          
        </div>
        </Link>
        <h2 className="headers">BEST SELLERS</h2>
        <div className="productcards">
          {bestSellers ? (
            bestSellers.map((bs) => (
              <SquareCard title={bs.name} image={bs.img} />
            ))
          ) : (
            <h5>best sellers arriving</h5>
          )}
        </div>

        <h2 className="headers">ACCESSORIES</h2>
        <div className="productcards">
          {accessories ? (
            accessories.map((as) => (
              <SquareCard title={as.name} image={as.img} />
            ))
          ) : (
            <h5>accessiories arriving</h5>
          )}
        </div>
        <h2 className="headers">SPECIAL TOYS</h2>
        <div className="productcards">
          {toys ? (
            toys.map((toy) => <SquareCard title={toy.name} image={toy.img} />)
          ) : (
            <h5>special toys arriving</h5>
          )}
        </div>
        <FooterContainer />
      </div>
    </div>
  );
};
export default DashboardClient;
