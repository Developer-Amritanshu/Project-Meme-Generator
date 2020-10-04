import React from 'react'

class MemeGenerator extends React.Component {
  constructor(){
    super()
    this.state={
      toptext:"",
      bottomtext:"",
      randomImage:"http://i.imgflip.com/1bij.jpg",
      allMemeImgs:[]
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    fetch('https://api.imgflip.com/get_memes')
    .then(response=>response.json())
    .then(response=>
      this.setState({
      allMemeImgs:response.data.memes
    }))
  }
  handleClick(event){
    const {name,value}= event.target
    this.setState({
      [name]:value
    })
  }
  handleSubmit(event){
    event.preventDefault()
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
    const randomMeme = this.state.allMemeImgs[randNum].url
    this.setState({
      randomImage:randomMeme
    })
  }
  render(){
    return(
      <div>
        <form className="meme-form">
          <input autoComplete="off" placeholder="top text" name="toptext" onChange={this.handleClick} value={this.state.toptext} />
          <input autoComplete="off" placeholder="bottom text" name="bottomtext" onChange={this.handleClick} value={this.state.bottomtext} />
          <button onClick={this.handleSubmit}>Gen</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImage} alt="meme template" />
          <h2 className="top">{this.state.toptext}</h2>
          <h2 className="bottom">{this.state.bottomtext}</h2>
        </div>
      </div>
    )
  }
}
export default MemeGenerator