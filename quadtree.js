class Point {
	constructor (x, y/*, userData */){
		this.x = x;
		this.y = y;
		//this.userData = userData ;
	}
}
class Rectangle {
	constructor (x, y, w, h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	contains(point){
		return(
			point.x >= this.x - this.w &&
			point.x <= this.x + this.w &&
			point.y >= this.y - this.h &&
			point.y <= this.y + this.h
		);
	}
	
	intersects ( range ){
		return !(
			this.x + this.w < range.x + range.w ||
			this.x - this.w > range.x + range.w ||
			this.y + this.h < range.y - range.h ||
			this.y - this.h > range.y + range.h
		);
	}
}

class QuadTree{
	constructor(boundary, n){
		this.boundary = boundary;
		this.capacity = n;
		this.points = [];
		this.divided = false;
	}

	subdivide(){
		let x = this.boundary.x;
		let y = this.boundary.y;
		let h = this.boundary.h;
		let w = this.boundary.w;

		let qt_northeast = new Rectangle(x+w/2 , y-h/2 , w/2 , h/2);
		this.northeast = new QuadTree(qt_northeast,4);

		let qt_northwest = new Rectangle(x-w/2 , y-h/2 , w/2 , h/2);
		this.northwest = new QuadTree(qt_northwest,4);

		let qt_southeast = new Rectangle(x+w/2 , y+h/2 , w/2 , h/2);
		this.southeast = new QuadTree(qt_southeast,4);

		let qt_southwest = new Rectangle(x-w/2 , y+h/2 , w/2 , h/2);
		this.southwest = new QuadTree(qt_southwest,4);
		
		this.divided = true;
	}

	insert(point){
		if(!this.boundary.contains(point)){
			return;
		}
		if(this.points.length < this.capacity){
			this.points.push(point);
			return true;
		}else{
			if(!this.divided) this.subdivide();
			if(this.northeast.insert(point)) return true;
			else if (this.northwest.insert(point)) return true;
			else if (this.southeast.insert(point)) return true;
			else if (this.southwest.insert(point)) return true;
		}
	}

	show () {
		stroke (255) ;
		strokeWeight (1) ;
		noFill () ;
		rectMode ( CENTER );
		rect ( this.boundary.x, this.boundary.y, this.boundary.w*2 , this.boundary.h*2);
		if( this.divided){
			this.northeast.show();
			this.northwest.show();
			this.southeast.show();
			this.southwest.show();
		}
		for (let p of this . points ){
			strokeWeight (4) ;
			point (p.x, p.y);
		}
	}
}