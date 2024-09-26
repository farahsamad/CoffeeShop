import React from "react";
import { useOutletContext } from "react-router";
import "../../component/Styles/Menu.css";
import Footer from "../footer/Index";

interface homeProps {
  barVisibility: boolean;
}

function Menu() {
  const barsVisibility = useOutletContext<homeProps>();
  const barVisibility = barsVisibility.barVisibility;
  return (
    <div
      className={`main-home-page-container ${
        barVisibility ? "" : "bar-visible"
      }`}
    >
      <div className={`home-page-container`}>
        <div className="menu-page-container">
          <div className="first-section-menu-container">
            <div className="menu-sentence">Menu</div>
            <hr />
          </div>
          <div className="second-section-menu-container">
            <div className="first-part-menu"></div>
            <div className="second-part-menu">
              <div className="hot-coffees">
                <div className="hot-coffees-sentence">
                  <div className="menu-sentence"> Hot Coffees</div>
                  <hr />
                </div>
                <div className="coffees-content">
                  <div className="coffees-content-container">
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/cappuccino.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Cappuccino</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/caramel-frappe.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Caramel Frappe</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/Chocolate-frappe.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Chocolate Frappe</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img src={require("../../image/espresso.jpg")} alt="" />
                      </div>
                      <div className="first-cup-name">Espresso</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/flat-white.jpeg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Flat White</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot Coffee</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/latte-coffee.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Latte Coffee</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/Macchiato.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Machiato</div>F
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/mocha-coffee.jpeg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Mocha</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/turkish-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Turkish Coffee</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/white-chocolate-mochas.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">
                        White Chocolate Mocha
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cold-coffees">
                <div className="cold-coffees-sentence">
                  <div className="menu-sentence">Cold Coffees</div>
                  <hr />
                </div>
                <div className="coffees-content">
                  <div className="coffees-content-container">
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/iced-americano.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Iced Americano</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/iced-chocolate-frappe-coffee.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">
                        Iced Chocolate Frappe Coffee
                      </div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/iced-coffee.jpeg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Iced coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/iced-flat-white.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Iced Flat White</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/iced-latte.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Iced Latte</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/iced-machiato.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Iced Machiato</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/iced-mochas.jpeg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Iced Mochas</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/iced-shaken-espresso.jpeg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Iced Shaken Espresso</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="iced-tea">
                <div className="iced-tea-sentence">
                  <div className="menu-sentence">Iced Tea</div>
                  <hr />
                </div>
                <div className="coffees-content">
                  <div className="coffees-content-container">
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/iced-chai-tea.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Iced Chai Tea</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/iced-lemon-tea.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Iced Lemon Tea</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/iced-matcha.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Iced Matcha</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/iced-peach-tea.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Iced Peach Tea</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hot-tea">
                <div className="hot-tea-sentence">
                  <div className="menu-sentence">Hot Tea</div>
                  <hr />
                </div>
                <div className="coffees-content">
                  <div className="coffees-content-container">
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img src={require("../../image/chai-tea.jpg")} alt="" />
                      </div>
                      <div className="first-cup-name">Chai Tea</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/green-tea.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Green Tea</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img src={require("../../image/tea-milk.jpg")} alt="" />
                      </div>
                      <div className="first-cup-name">Milk Tea</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hot-chocolate">
                <div className="hot-chocolate-sentence">
                  <div className="menu-sentence"> Hot Chocolate</div>
                  <hr />
                </div>
                <div className="coffees-content">
                  <div className="coffees-content-container">
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-chocolate.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot Chocolate</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/white-hot-chocolate.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">White hot chocolate</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="juice">
                <div className="juice-sentence">
                  <div className="menu-sentence">Juice</div>
                  <hr />
                </div>
                <div className="coffees-content">
                  <div className="coffees-content-container">
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/apple-juice.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Apple Juice</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/carrot-juice.jpeg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Carrot Juice</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/mango-juice.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Mango Juice</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/orange-juice.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Orange Juice</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/pomegranate-juice.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Pomegranate Juice</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/raspberry-juice.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Raspberry Juice</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/strawberry-juice.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Strawberry Juice</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="milk">
                <div className="milk-sentence">
                  <div className="menu-sentence">Milk</div>
                  <hr />
                </div>
                <div className="coffees-content">
                  <div className="coffees-content-container">
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/cold-milk.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Cold Milk</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/steamed-milk.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Steamed Milk</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/vanilla-cream-milk.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Vanilla Cream Milk</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="water-sparkling">
                <div className="water-sparkling-sentence">
                  <div className="menu-sentence">Water and Sparkling</div>
                  <hr />
                </div>
                <div className="coffees-content">
                  <div className="coffees-content-container">
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img src={require("../../image/water.png")} alt="" />
                      </div>
                      <div className="first-cup-name">Cup Of Water</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/sparkling-water.png")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Sparkling Water</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/water-bottle.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Water bottle</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Menu;
