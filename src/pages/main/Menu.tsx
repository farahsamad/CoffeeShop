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
                <div className="hot-coffees-content">
                  <div className="hot-coffees-content-container">
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>

                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cold-coffees">
                <div className="cold-coffees-sentence">
                  <div className="menu-sentence">Cold Coffees</div>
                  <hr />
                </div>
                <div className="cold-coffees-content">
                  <div className="cold-coffees-content-container">
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="iced-tea">
                <div className="iced-tea-sentence">
                  <div className="menu-sentence">Iced Tea</div>
                  <hr />
                </div>
                <div className="iced-tea-content">
                  <div className="iced-tea-content-container">
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hot-tea">
                <div className="hot-tea-sentence">
                  <div className="menu-sentence">Hot Tea</div>
                  <hr />
                </div>
                <div className="hot-tea-content">
                  <div className="hot-tea-content-container">
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hot-chocolate">
                <div className="hot-chocolate-sentence">
                  <div className="menu-sentence"> Hot Chocolate</div>
                  <hr />
                </div>
                <div className="hot-chocolate-content">
                  <div className="hot-chocolate-content-container">
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="juice">
                <div className="juice-sentence">
                  <div className="menu-sentence">Juice</div>
                  <hr />
                </div>
                <div className="juice-content">
                  <div className="juice-content-container">
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="milk">
                <div className="milk-sentence">
                  <div className="menu-sentence">Milk</div>
                  <hr />
                </div>
                <div className="milk-content">
                  <div className="milk-content-container">
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="water-sparkling">
                <div className="water-sparkling-sentence">
                  <div className="menu-sentence">Water and Sparkling</div>
                  <hr />
                </div>
                <div className="water-sparkling-content">
                  <div className="water-sparkling-content-container">
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
                    </div>
                    <div className="first-cup">
                      <div className="first-cup-image">
                        <img
                          src={require("../../image/hot-coffee.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="first-cup-name">Hot coffee</div>
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
