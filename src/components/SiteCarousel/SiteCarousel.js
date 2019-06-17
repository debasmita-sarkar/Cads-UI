/**
 * 
 */
import React from 'react';
import './SiteCarousel.css';
import {
	  Carousel,
	  CarouselItem,
	  CarouselControl,
	  CarouselIndicators,
	  CarouselCaption
	} from 'reactstrap';

	const items = [
		{
			src: 'apt1.jpg',
			altText: 'Manage Apartment',
			caption: 'Manage Apartment'
		},
	  {
	    src: 'apt3.png',
	    altText: 'Manage Visitors and parking',
	    header: 'Manages viitor entry and parking',
	    caption: 'Manage Visitors and parking'
	  },
	  {
	    src: 'apt2.jpg',
	    altText: 'Manage Finance',
	    header: 'Manages maintenance payment helps to control the balance amount and its usage',
	    caption: 'Manage Finance'
	  }
	
	];


class SiteCarousel extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = { activeIndex: 0 };
	    this.next = this.next.bind(this);
	    this.previous = this.previous.bind(this);
	    this.goToIndex = this.goToIndex.bind(this);
	    this.onExiting = this.onExiting.bind(this);
	    this.onExited = this.onExited.bind(this);
	  }

	  onExiting() {
	    this.animating = true;
	  }

	  onExited() {
	    this.animating = false;
	  }

	  next() {
	    if (this.animating) return;
	    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
	    this.setState({ activeIndex: nextIndex });
	  }

	  previous() {
	    if (this.animating) return;
	    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
	    this.setState({ activeIndex: nextIndex });
	  }

	  goToIndex(newIndex) {
	    if (this.animating) return;
	    this.setState({ activeIndex: newIndex });
	  }

	  render() {
	    const { activeIndex } = this.state;

	    const slides = items.map((item) => {
	      return (
	        <CarouselItem
	          onExiting={this.onExiting}
	          onExited={this.onExited}
	          key={item.src}
	        >
	          <img src={item.src} alt={item.altText} />
	          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
	        </CarouselItem>
	      );
	    });

	    return (
	    		<div>
	            <style>
	              {
	                `.custom-tag {
	                    max-width: 100%;
	                    height: 500px;
	                    background: black;
	                  }`
	              }
	            </style>
	      <Carousel
	        activeIndex={activeIndex}
	        next={this.next}
	        previous={this.previous}
	      >
	        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
	        {slides}
	        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
	        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
	      </Carousel>
	        </div>
	    );
	  }
}
export default SiteCarousel;