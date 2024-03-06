import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import Slider from "react-slick";
import Games from "../../Data/Games";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.scss";


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      betAmountInput: "",
    };


    this.token = localStorage.getItem('token');
    this.settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
  }

  handlePlayClick = async (id) => {
    const storedToken = localStorage.getItem("token");

    if (id === 2) {
      const userBetAmount = prompt("Enter your bet amount:");

      if (!userBetAmount || isNaN(parseFloat(userBetAmount)) || parseFloat(userBetAmount) <= 0) {
        alert("Invalid bet amount. Please enter a valid bet amount.");
        return;
      }

      this.setState({ betAmountInput: userBetAmount });
    }

    this.setState({ loading: true });

    try {
      const headers = { Authorization: `Bearer ${storedToken}` };

      switch (id) {
        case 1:
        case 2:
        case 5:
        case 7:
          const response = await axios.post(
            `https://spinz-server-100d0276d968.herokuapp.com/${this.getGamePath(id)}`,
            this.getGameData(id),
            { headers }
          );
          if (response.status === 400) {
            alert("Insufficient Balance");
          } else {
            window.location.href = response.data.gameLink;
          }
          break;

        case 4:
        case 6:
          window.location.href = "https://tac-game.vercel.app/";
          break;

        default:
          console.log("Unknown game id");
      }
    } catch (error) {
      alert("Something went wrong , try again later");
    } finally {
      this.setState({ loading: false });
    }
  };

  getGamePath = (id) => {
    const paths = {
      1: "slot",
      2: "startGame",
      5: "dice",
      7: "wheel",
    };
    return paths[id] || "";
  };

  getGameData = (id) => {
    if (id === 2) {
      return { betAmount: this.state.betAmountInput };
    }
    return {};
  };

  render() {
    const { showSidebar, active, closeSidebar } = this.props;
    const { loading } = this.state;

    return (
      <div className="home">
        <Sidebar active={active} closeSidebar={closeSidebar} />
        <div className="home_container">
          <Navbar showSidebar={showSidebar} />
          <div className="content">
            <div className="games_slider">
              <div className="div">
                <Slider {...this.settings}>
                  {Games.map(({ id, title, img }) => (
                    <div key={id} className="game_box">
                      <img src={img} alt="" className="game_img" />
                      <div className="title">{title}</div>
                      <div
                        className="form_btn"
                        onClick={() => this.handlePlayClick(id)}
                      >
                        {loading ? "Loading..." : "Play"}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    );
  }
}

export default Home;
