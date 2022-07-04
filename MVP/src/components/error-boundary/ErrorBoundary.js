import React, {Component} from 'react';
import {ErrorImageOverlay, ErrorImageContainer, ErrorImageText} from './ErrorBoundary-Styles'
import ErrorPage from '../../assets/404page.png';


class ErrorBoundary extends Component {
	constructor( ) {
		super();
		this.state = {
           hasError : false
		}

	}

   static getDerivedStateFromError(error) {
   	 return {
   	 	hasError : true
   	 }
   }

	componentDidCatch(error) {
		console.log(error)
	}

	render(){
	  if(this.state.hasError ){
	  	 	return(
               <ErrorImageOverlay>
                <ErrorImageContainer imageUrl ={ErrorPage} />
                <ErrorImageText> Sorry, This Page is Broken </ErrorImageText>
               </ErrorImageOverlay>
 
			)
	  }
	  return this.props.children
	}
}


export default ErrorBoundary;