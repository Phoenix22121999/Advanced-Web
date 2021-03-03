import React from 'react'
import { connect } from 'react-redux'
import './DashBoard.scss'
const DashBoardContainer = (props) => {
    return (
        <div className='dash-board-container'>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export const DashBoard = connect(mapStateToProps, mapDispatchToProps)(DashBoardContainer)
