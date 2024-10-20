import React from "react";
import { useOutletContext } from "react-router";
import "../../component/Styles/Menu.css";
import Footer from "../footer/Index";
import LoadingImage from "../../Controllers/Elements/LoadingImage";

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
                        <LoadingImage
                          src={require("../../component/image/cappuccino.png")}
                          imageAlt="Cappuccino"
                        />
                      </div>
                      <div className="first-cup-name">Cappuccino</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/caramel-frappe.png")}
                          imageAlt="Caramel Frappe"
                        />
                      </div>
                      <div className="first-cup-name">Caramel Frappe</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/Chocolate-frappe.jpg")}
                          imageAlt="Chocolate Frappe"
                        />
                      </div>
                      <div className="first-cup-name">Chocolate Frappe</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/espresso.jpg")}
                          imageAlt="Espresso"
                        />
                      </div>
                      <div className="first-cup-name">Espresso</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/flat-white.jpeg")}
                          imageAlt="Flat White"
                        />
                      </div>
                      <div className="first-cup-name">Flat White</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/hot-coffee.jpg")}
                          imageAlt="Hot Coffee"
                        />
                      </div>
                      <div className="first-cup-name">Hot Coffee</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/latte-coffee.png")}
                          imageAlt="Latte Coffee"
                        />
                      </div>
                      <div className="first-cup-name">Latte Coffee</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/Machiato.jpg")}
                          imageAlt="Machiato"
                        />
                      </div>
                      <div className="first-cup-name">Machiato</div>F
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/mocha-coffee.jpeg")}
                          imageAlt="Mocha"
                        />
                      </div>
                      <div className="first-cup-name">Mocha</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/turkish-coffee.jpg")}
                          imageAlt=""
                        />
                      </div>
                      <div className="first-cup-name">Turkish Coffee</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/white-chocolate-mochas.png")}
                          imageAlt="White Chocolate Mocha"
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
                        <LoadingImage
                          src={require("../../component/image/iced-americano.jpg")}
                          imageAlt="Iced Americano"
                        />
                      </div>
                      <div className="first-cup-name">Iced Americano</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/iced-chocolate-frappe-coffee.png")}
                          imageAlt="Iced Chocolate Frappe Coffee"
                        />
                      </div>
                      <div className="first-cup-name">
                        Iced Chocolate Frappe Coffee
                      </div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/iced-coffee.jpeg")}
                          imageAlt="Iced coffee"
                        />
                      </div>
                      <div className="first-cup-name">Iced coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/iced-flat-white.png")}
                          imageAlt="Iced Flat White"
                        />
                      </div>
                      <div className="first-cup-name">Iced Flat White</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/iced-latte.jpg")}
                          imageAlt="Iced Latte"
                        />
                      </div>
                      <div className="first-cup-name">Iced Latte</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/iced-machiato.png")}
                          imageAlt="Iced Machiato"
                        />
                      </div>
                      <div className="first-cup-name">Iced Machiato</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/iced-mochas.jpeg")}
                          imageAlt="Iced Mochas"
                        />
                      </div>
                      <div className="first-cup-name">Iced Mochas</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/iced-shaken-espresso.jpeg")}
                          imageAlt="Iced Shaken Espresso"
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
                        <LoadingImage
                          src={require("../../component/image/iced-chai-tea.jpg")}
                          imageAlt="Iced Chai Tea"
                        />
                      </div>
                      <div className="first-cup-name">Iced Chai Tea</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/iced-lemon-tea.png")}
                          imageAlt="Iced Lemon Tea"
                        />
                      </div>
                      <div className="first-cup-name">Iced Lemon Tea</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/iced-matcha.jpg")}
                          imageAlt="Iced Matcha"
                        />
                      </div>
                      <div className="first-cup-name">Iced Matcha</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/iced-peach-tea.png")}
                          imageAlt="Iced Peach Tea"
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
                        <LoadingImage
                          src={require("../../component/image/chai-tea.jpg")}
                          imageAlt="Chai Tea"
                        />
                      </div>
                      <div className="first-cup-name">Chai Tea</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/green-tea.png")}
                          imageAlt="Green Tea"
                        />
                      </div>
                      <div className="first-cup-name">Green Tea</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/tea-milk.jpg")}
                          imageAlt="Milk Tea"
                        />
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
                        <LoadingImage
                          src={require("../../component/image/hot-chocolate.jpg")}
                          imageAlt="Hot Chocolate"
                        />
                      </div>
                      <div className="first-cup-name">Hot Chocolate</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/white-hot-chocolate.png")}
                          imageAlt="White hot chocolate"
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
                        <LoadingImage
                          src={require("../../component/image/apple-juice.png")}
                          imageAlt="Apple Juice"
                        />
                      </div>
                      <div className="first-cup-name">Apple Juice</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/carrot-juice.jpeg")}
                          imageAlt="Carrot Juice"
                        />
                      </div>
                      <div className="first-cup-name">Carrot Juice</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/mango-juice.png")}
                          imageAlt="Mango Juice"
                        />
                      </div>
                      <div className="first-cup-name">Mango Juice</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/orange-juice.png")}
                          imageAlt="Orange Juice"
                        />
                      </div>
                      <div className="first-cup-name">Orange Juice</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/pomegranate-juice.jpg")}
                          imageAlt="Pomegranate Juice"
                        />
                      </div>
                      <div className="first-cup-name">Pomegranate Juice</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/raspberry-juice.png")}
                          imageAlt="Raspberry Juice"
                        />
                      </div>
                      <div className="first-cup-name">Raspberry Juice</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/strawberry-juice.png")}
                          imageAlt="Strawberry Juice"
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
                        <LoadingImage
                          src={require("../../component/image/cold-milk.png")}
                          imageAlt="Cold Milk"
                        />
                      </div>
                      <div className="first-cup-name">Cold Milk</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/steamed-milk.jpg")}
                          imageAlt="Steamed Milk"
                        />
                      </div>
                      <div className="first-cup-name">Steamed Milk</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/vanilla-cream-milk.png")}
                          imageAlt="Vanilla Cream Milk"
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
                        <LoadingImage
                          src={require("../../component/image/water.png")}
                          imageAlt="Cup Of Water"
                        />
                      </div>
                      <div className="first-cup-name">Cup Of Water</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/sparkling-water.png")}
                          imageAlt="Sparkling Water"
                        />
                      </div>
                      <div className="first-cup-name">Sparkling Water</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <LoadingImage
                          src={require("../../component/image/water-bottle.jpg")}
                          imageAlt="Water bottle"
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
