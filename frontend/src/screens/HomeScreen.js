import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from './../components/Product'
import {listProducts} from './../actions/productActions'
import Loader from '../components/Loader'
import '../index.css'



const HomeScreen = () => {
	const dispatch = useDispatch()
	const productList = useSelector(state => state.productList)
	const { loading, error, products} = productList
	
	useEffect(() => {
		dispatch(listProducts())	
	}, [dispatch])


  return (
    <>
    <div id="carousel-home">
			<div className="owl-carousel owl-theme">
				<div className="owl-slide cover" style={{backgroundImage: 'url(images/slide_home_2.jpg)'}}>
					<div className="opacity-mask d-flex align-items-center" data-opacity-mask="rgba(0, 0, 0, 0.5)">
						<div className="container">
							<div className="row justify-content-center justify-content-md-end">
								<div className="col-lg-6 static">
									<div className="slide-text text-right white">
										<h2 className="owl-slide-animated owl-slide-title">Attack Air<br />Max 720 Sage Low</h2>
										<p className="owl-slide-animated owl-slide-subtitle">
											Limited items available at this price
										</p>
										<div className="owl-slide-animated owl-slide-cta"><a className="btn_1" href="listing-grid-1-full.html" role="button">Shop Now</a></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!--/owl-slide--> */}
				<div className="owl-slide cover" style={{backgroundImage: 'url(images/slide_home_1.jpg)'}}>
					<div className="opacity-mask d-flex align-items-center" data-opacity-mask="rgba(0, 0, 0, 0.5)">
						<div className="container">
							<div className="row justify-content-center justify-content-md-start">
								<div className="col-lg-6 static">
									<div className="slide-text white">
										<h2 className="owl-slide-animated owl-slide-title">Attack Air<br/>VaporMax Flyknit 3</h2>
										<p className="owl-slide-animated owl-slide-subtitle">
											Limited items available at this price
										</p>
										<div className="owl-slide-animated owl-slide-cta"><a className="btn_1" href="listing-grid-1-full.html" role="button">Shop Now</a></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!--/owl-slide--> */}
				<div className="owl-slide cover" style={{backgroundImage: 'url(images/slide_home_3.jpg)'}}>
					<div className="opacity-mask d-flex align-items-center" data-opacity-mask="rgba(255, 255, 255, 0.5)">
						<div className="container">
							<div className="row justify-content-center justify-content-md-start">
								<div className="col-lg-12 static">
									<div className="slide-text text-center black">
										<h2 className="owl-slide-animated owl-slide-title">Attack Air<br />Monarch IV SE</h2>
										<p className="owl-slide-animated owl-slide-subtitle">
											Lightweight cushioning and durable support with a Phylon midsole
										</p>
										<div className="owl-slide-animated owl-slide-cta"><a className="btn_1" href="listing-grid-1-full.html" role="button">Shop Now</a></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <!--/owl-slide--> */}
				</div>
			</div>
			<div id="icon_drag_mobile"></div>
		</div>
    <ul id="banners_grid" className="clearfix">
			<li>
				<a href="#0" className="img_container">
					<img src="images/banner_1.jpg" data-src="images/banner_1.jpg" alt="" className="lazy"/>
					<div className="short_info opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.5)">
						<h3>Men's Collection</h3>
						<div><span className="btn_1">Shop Now</span></div>
					</div>
				</a>
			</li>
			<li>
				<a href="#0" className="img_container">
					<img src="images/banner_2.jpg" data-src="images/banner_2.jpg" alt="" className="lazy" />
					<div className="short_info opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.5)">
						<h3>Womens's Collection</h3>
						<div><span className="btn_1">Shop Now</span></div>
					</div>
				</a>
			</li>
			<li>
				<a href="#0" className="img_container">
					<img src="images/banner_3.jpg" data-src="images/banner_3.jpg" alt="" className="lazy" />
					<div className="short_info opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.5)">
						<h3>Kids's Collection</h3>
						<div><span className="btn_1">Shop Now</span></div>
					</div>
				</a>
			</li>
		</ul>
    {/* banner */}
    <div className="container margin_60_35">
			<div className="main_title">
				<h2>Latest Products</h2>
				<span>Products</span>
				<p>Cum doctus civibus efficiantur in imperdiet deterruisset</p>
			</div>
			{loading ? (<Loader />) : error ? (<h2>{error}</h2>) : <div className="row small-gutters">
					{products.map(product => (
           <Product key={product._id} product={product} />
          ))}
					{/* <!-- /grid_item --> */}
				{/* <!-- /col --> */}				
			</div>	}
			
			{/* <!-- /row --> */}
		</div>
    </>
  )
}

export default HomeScreen
