// import "./styles.css";
import { useState } from 'react'
const colors = ['red', 'blue', 'green', 'yellow', 'pink']
const Image = ({index}) => {
  return (<div className="slide" style={{background: colors[index]}}>{index}</div>)
}
const numSlides = 5
export default function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [data, setData] = useState({})

  const prev = activeSlide - 1 >= 0 ? activeSlide - 1 : numSlides - 1
  const next = (activeSlide + 1)%5
  
  const updateSlide = (newSlide) => {
    if (newSlide === activeSlide) {
      return
    }
    let data = {}
    if (newSlide > activeSlide) {
      data.order = [activeSlide, newSlide]
      data.transition = 'next'
    } else {
      data.order = [newSlide, activeSlide]
      data.transition = 'prev'
    }
    setData(data)
    setActiveSlide(newSlide)
    setTimeout(() => {
        setData({})
    }, 400)
  }
  const slidesToRender = data.order || [activeSlide]
  const transition = data.transition || ''
  return (
    <div className="container">
      <div className="slides-container">

             <div className={`slides ${transition}`}>
                {slidesToRender.map(x => (
                    <Image key={x} index={x} />
                ))}
            </div>
            <div className="buttons">
                <button onClick={() => updateSlide(prev)} className="prevNav">Prev</button>
                <button onClick={() => updateSlide(next)} className="nextNav">Next</button>
            </div>
            <div className="dots">
                {[...new Array(numSlides)].map((_, index) => {
                    return <span 
                                className={`dot ${activeSlide === index ? 'active' : ''}`}
                                onClick={() => updateSlide(index)}
                                key={index}
                            />
                })}
            </div>
      </div>
       
    </div>
  );
}
