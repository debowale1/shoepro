import React from 'react'

const Banner = () => {
  return (
    <ul id="banners_grid" class="clearfix">
			<li>
				<a href="#0" class="img_container">
					<img src="images/banner_1.jpg" data-src="images/banner_1.jpg" alt="" class="lazy"/>
					<div class="short_info opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.5)">
						<h3>Men's Collection</h3>
						<div><span class="btn_1">Shop Now</span></div>
					</div>
				</a>
			</li>
			<li>
				<a href="#0" class="img_container">
					<img src="images/banner_2.jpg" data-src="images/banner_2.jpg" alt="" class="lazy" />
					<div class="short_info opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.5)">
						<h3>Womens's Collection</h3>
						<div><span class="btn_1">Shop Now</span></div>
					</div>
				</a>
			</li>
			<li>
				<a href="#0" class="img_container">
					<img src="images/banner_3.jpg" data-src="images/banner_3.jpg" alt="" class="lazy" />
					<div class="short_info opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.5)">
						<h3>Kids's Collection</h3>
						<div><span class="btn_1">Shop Now</span></div>
					</div>
				</a>
			</li>
		</ul>
  )
}

export default Banner
