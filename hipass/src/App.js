import React from "react";
import axios from "axios";
import Traffic from "./traffic";

class App extends React.Component {
  state = {
    isLoading: true,
    data: [],
  };

  getTraffic() {
    const url = `http://data.ex.co.kr/openapi/trafficapi/nationalTrafficVolumn?key=5577395142&type=json&sumDate=20211101&exDivCode=00`;
    console.log(url);
    axios.get(url).then((Response) => {
      const data = Response.data.list;
      console.log(data);

      this.setState({
        isLoading: false,
        data: data,
      });
    });
  }
  componentDidMount() {
    this.getTraffic();
  }
  render() {
    const { isLoading, data } = this.state;

    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">Loading...</span>
          </div>
        ) : (
          <div className="trafficInfo">
            {data.map((d, cnt) => {
              return (
                <Traffic
                  sumDate={data[cnt].sumDate}
                  exDivCode={data[cnt].exDivCode}
                  tcsType={data[cnt].tcsType}
                  carType={data[cnt].carType}
                  trafficVolumn={data[cnt].trafficVolumn}
                />
              );
            })}
          </div>
        )}
      </section>
    );
  }
}
export default App;
