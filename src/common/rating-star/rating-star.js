import _ from "lodash";
import React, { Component, Fragment } from "react";
//interface - size, rating

class RatingStar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: this.generateStars(),
      rating: props.rating
    };
  }

  componentDidMount() {
    const { rating } = this.props;
    if (rating) this.setState({ ratings: this.handleStarPopulate(rating) });
  }

  generateStars = () => {
    const size = this.props.size | 5;
    const numberOfStars = _.range(1, size + 1);
    return numberOfStars.map(x => ({ id: x, isChecked: false }));
  };

  handleClick = id => {
    this.props.onChange(id);
    this.setState({ ratings: this.handleStarPopulate(id), rating: id });
  };

  handleStarPopulate = position => {
    let ratings = [...this.state.ratings];

    if (!position) return;

    //set all to unchecked
    ratings = _.map(ratings, rating => {
      return {
        id: rating.id,
        isChecked: false
      };
    });

    let slicedArray = ratings.slice(0, position);
    slicedArray = _.map(slicedArray, rating => {
      return {
        id: rating.id,
        isChecked: true
      };
    });

    return [...slicedArray, ...ratings.slice(position)];
  };

  render() {
    const { ratings } = this.state;
    const { onChange } = this.props;

    return (
      <Fragment>
        <span className="ml-2 ratingStars">
          {ratings.map(({ id, isChecked }) => (
            <i
              key={id}
              onClick={() => {
                if (this.props.isClickable) {
                  this.handleClick(id);
                }
              }}
              className={isChecked ? "fa fa-star" : "fa fa-star-o"}
            ></i>
          ))}
        </span>
      </Fragment>
    );
  }
}

export default RatingStar;
