import React, { Component } from 'react'
import Link from 'gatsby-link'
import './header.css'
import $ from 'jquery'
import PubSub from 'pubsub-js'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false,
      showLanguageList:false,
      languages:{
        EN:1,
        CN:0
      }
    }
  }
  render() {
    var language_change_mobile_c = (<div></div>)
    var language_change_mobile_list = []
    Object.keys(this.state.languages).forEach(key => {
      if (this.state.languages[key]) {
        language_change_mobile_c = (<div key={key} className={'language_change_mobile_c'} onClick={this.openLanguageList.bind(this)}>{key} <i></i></div>)
      }else{
        language_change_mobile_list.push(<li key={key} onClick={this.changeLanguage.bind(this,key)}>{key}</li>)
      }
    })
    return (
      <div className={`navbar navbar-default navbar-fixed-top`}>
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" style={{ fontSize: '.8rem', color: '#000', fontFamily: 'PingFangSC-Regular' }} className='brand'>
              <span className={`logo_top`}></span>
              </Link>
            <div className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">

            </div>
          </div>
          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            <ul className='nav navbar-nav navbar-right'>
              <li className={'active link_item'}><a href="javascript:;">HOME</a></li>
              <li className={'link_item'}><a href="javascript:;">ABOUT</a></li>
              <li className={'link_item'}><a href="javascript:;">TECHNOLOGY</a></li>
              <li className={'link_item'}><a href="javascript:;">ADVANTAGE</a></li>
              <li className={'link_item'}><a href="javascript:;">CONTACT</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  changeLanguage(key){
    let languages = this.state.languages
    
    Object.keys(languages).forEach(element => {
      if (languages[element]) {
        languages[element] = 0
      }
    });
    languages[key] = 1
    this.setState({
      languages:languages
    })
    PubSub.publish('changeLanguage',key)
  }
  openLanguageList(){
    this.setState({
      showLanguageList:!this.state.showLanguageList
    })
  }
  componentDidMount() {
    let nav_button = $('.navbar-toggle')
    let navbar_collapse =$('.navbar-collapse ')
    let navbar =$('.navbar-default');
    nav_button.click(() => {
      this.setState({
        showNav: !this.state.showNav
      })
    })
    PubSub.subscribe('closeNav',(msg,closeNav)=>{
      this.setState({
        showNav: closeNav
      })
    })
    window.addEventListener('scroll',()=>{
      let scrollTop = $(document).scrollTop();
      if(scrollTop>100){
        navbar.addClass('navbar_shadow');
      }else{
        navbar.removeClass('navbar_shadow');
      }
      if(scrollTop>50){
        navbar_collapse.addClass('navbar-collapse_shadow');
      }else if(!this.state.showNav){
        navbar_collapse.removeClass('navbar-collapse_shadow');
      }
    })
  }
  componentDidUpdate(){
    let main_links = $('.navbar-collapse')
    let nav_button = $('.navbar-toggle')
    let navbar_collapse =$('.navbar-collapse ')
    if (this.state.showNav) {
      main_links.addClass('showNav');
      nav_button.addClass('navbar-toggle-close')
      navbar_collapse.addClass('navbar-collapse_shadow')
    } else {
      main_links.removeClass('showNav');
      nav_button.removeClass('navbar-toggle-close')
      let scrollTop = $(document).scrollTop();
      if(scrollTop<50){
        navbar_collapse.removeClass('navbar-collapse_shadow')
      }
    }
  }
}

export default Header
