import React from 'react';
import GridLayout from 'react-grid-layout';

var _ = require('lodash');

class ShortestPath extends React.Component {
    state = {
        Trow: 7,
        Tcol:7,
        row: 7, 
        column: 7,
        colors: [], 
        startPoint:"", 
        endPoint:"", 
        selectedBoxes: [], 
        Queue: [], 
        shortestPathArray: [],
        colorPath : []
    }

    componentDidMount() {
       this.initialTable()
    }

    initialTable = () => {
        const rows = _.range(0, this.state.row);
        const cols =  _.range(0, this.state.column);

        const colors = rows.map(row => {
            return cols.map(col => {
                return 'grey'
            })
        })
        this.setState({colors})

        var randomrow1 = rows[Math.floor(Math.random()*(rows.length - 1))];
        var randomrow2 = rows[Math.floor(Math.random()*(rows.length - 1))];
        let startPoint = randomrow1 + " " + 0
        // let endPoint   = randomrow2 + " " + (this.state.column -1)
        let endPoint   =   (this.state.row -1) + " " + randomrow2
        this.setState({startPoint, endPoint})

        this.findNextneighbours(randomrow1, 0)

        // for(var j=0; j<this.state.Queue.length; j++){
        //     var str1 = this.state.Queue[j].split(" ")
        //     var newr = parseInt(str1[0])
        //     var newc = parseInt(str1[1])
        //     this.findNextneighbours(newr, newc)
        // }


              
    }

    findNextneighbours = (r , c) => {
        const {colors} = this.state;
        const ChangeColors = colors;
        var QueueElmnt = []
        var str2 = this.state.endPoint.split(" ")
        let endR = str2[0]
        let endC = str2[1]
        let dr = [-1, +1, 0, 0]
        let dc = [-0, +0, +1, -1]
     
              for(var i=0; i<4; i++){
                 let rr = r + dr[i]
                 let cc = c + dc[i]

                 if (rr<0 || cc<0) continue;
                 if(rr >= this.state.row || cc >= this.state.column) continue;
                 this.state.Queue.push(rr + " " + cc)

                 if(rr == endR && cc == endC){
                    for(var k=0; k< this.state.colorPath.length; k++){
                       var str3 = this.state.colorPath[k].split(" ")
                       var Pr = parseInt(str3[0])
                       var Pc = parseInt(str3[1])
                       if(ChangeColors[Pr][Pc] === 'yellow') {
                           ChangeColors[Pr][Pc] = 'Pink'
                       } 
                    }
                    this.setState({colors: ChangeColors}, () => {
                        //  alert("Path Found")
                    })
                }
              }

            //   this.state.Queue.map((item, index) => {
            //     var str = item.split(" ")
            //     var strR = str[0]
    
            //     let dr = [-1, +1, 0, 0]
            //     let dc = [-0, +0, +1, -1]
             
            //           for(var i=0; i<4; i++){
            //              let rr = str[0] + dr[i]
            //              let cc = str[1] + dc[i]
        
            //              if (rr<0 || cc<0) continue;
            //              if(rr >= this.state.row || cc >= this.state.column) continue;
            //              if (rr == strR || cc == 0) continue;
            //              QueueElmnt[index] = (rr + " " + cc)
            //   }
             
            // })
            // this.setState({Queue : QueueElmnt})
            
}
    

    handleNumberChange = e => {
        if(e.target.value < 20){
            var re = new RegExp(/^[0-9]*$/);
            if (re.test(e.target.value)) {
                this.setState({ [e.target.name]: e.target.value });
            }
        }
       
    }

    GenerateGride = () => {
        this.setState({row: this.state.Trow, column:this.state.Tcol}, () => {
            this.initialTable()
        })
    }

    ResetGride = () => {
        this.setState({row:7, column:7}, () => {
            this.initialTable()
        })
    }

    selectedCol = (r,c) => {
        console.log("row/column", r, c)
        this.backgroundColor(r,c)
    }

   backgroundColor = (r,c) => {
        const {colors} = this.state;
        const updatedColors = colors;

        let dr = [-1, +1, 0, 0]
        let dc = [-0, +0, +1, -1]
     
              for(var i=0; i<4; i++){
                 let rr = r + dr[i]
                 let cc = c + dc[i]

                 if (rr<0 || cc<0) continue;
                 if(rr >= this.state.row || cc >= this.state.column) continue;
                 this.state.shortestPathArray.push(rr + " " + cc)

              }
        
        
            if(updatedColors[r][c] === 'yellow') {
                updatedColors[r][c] = 'grey'
                var index = this.state.selectedBoxes.indexOf(r + " " + c)
                  this.state.selectedBoxes.splice(index,1)
                  for(var j=0; j<this.state.Queue.length; j++){
                    var str1 = this.state.Queue[j].split(" ")
                    var Xr = parseInt(str1[0])
                    var Xc = parseInt(str1[1])
                    if(Xr == r && Xc == c){
                        var index = this.state.colorPath.indexOf(this.state.Queue[j])
                       this.state.colorPath.splice(index, 1)
                       this.findNextneighbours(Xr, Xc)
                    }
                }
            } else {
                updatedColors[r][c] = 'yellow'
                this.state.selectedBoxes.push(r + " " + c)
                for(var j=0; j<this.state.Queue.length; j++){
                    var str1 = this.state.Queue[j].split(" ")
                    var Xr = parseInt(str1[0])
                    var Xc = parseInt(str1[1])
                    if(Xr == r && Xc == c){
                        console.log("finding Path",this.state.Queue[j])
                       this.state.colorPath.push(this.state.Queue[j])
                       this.findNextneighbours(Xr, Xc)
                    }
                }
            }
        
        // console.log(colors)
        this.setState({colors: updatedColors})
    }


    render() {
        let totalCell = (this.state.row * this.state.column)
        console.log("colorPath", this.state.colorPath)
        console.log("shortestPathArray", this.state.shortestPathArray)
        let rows = _.range(0, this.state.row);
        let cols =  _.range(0, this.state.column);
        let cells = _.range(0, totalCell);
        const {colors} = this.state
        return (

            <div>
                <h3>Shortest Path App</h3>
                <div>
                <label>Row</label>
                        <input type="text"
                            name="Trow"
                            value={this.state.Trow}
                            onChange={this.handleNumberChange}
                            maxLength="20" />
                    <label>Column</label>
                        <input type="text"
                            name="Tcol"
                            value={this.state.Tcol}
                            onChange={this.handleNumberChange}
                            maxLength="20" />
                <button type="button" onClick={this.GenerateGride}><b> Generate gride </b></button>
                <button type="button" onClick={this.ResetGride}><b> Reset gride </b></button>
                </div> <br/> <br />

                
                <GridLayout className="layout" cols={20} rowHeight={25} width={1500} isDraggable= {false}
                    isResizable= {false}>
                    {rows.map((r,I) => (
                        cols.map((c,i) => (
                            this.state.startPoint == r + " " + c ? 
                            <div key={r + " " + c} data-grid={{x: c, y: r, w: 1, h: 2}} 
                            onClick={() => this.selectedCol(r,c)}
                            style={{border:"2px solid", background : 'green', pointerEvents: 'none' }}>
                            {r + " " + c}
                            </div>    
                    : 
                        this.state.endPoint == r + " " + c ?
                        <div key={r + " " + c} data-grid={{x: c, y: r, w: 1, h: 2}} 
                        onClick={() => this.selectedCol(r,c)}
                        style={{border:"2px solid", background : 'red', pointerEvents: 'none' }}>
                        {r + " " + c}
                        </div>
                    :
                            <div key={r + " " + c} data-grid={{x: c, y: r, w: 1, h: 2}} 
                            onClick={() => this.selectedCol(r,c)}
                            style={{border:"2px solid",
                                 background : colors && colors.length > 0 && colors[r] && colors[r][c] ? colors[r][c] :'grey'}}>
                            {r + " " + c}
                            </div>
                        ))
                       
                    ))}
                 </GridLayout>



                {/* <table className="table table-bordered" style={{margin:"5px", padding:"10px"}}>
                    <tbody>
                    {colors && colors.length > 0 && rows.map((r,I) => 
                        <tr className="Trow" key={I}>
                           {cols.map((c, i) =>
                                this.state.startPoint == r + " " + c ? 
                                    <td className="Tcol" key={i} onClick={() => this.selectedCol(r,c)} style={{background : 'green', pointerEvents: 'none'}}>
                                    {r + " " + c}
                                    </td>     
                            : 
                                this.state.endPoint == r + " " + c ?
                                    <td className="Tcol" key={i} onClick={() => this.selectedCol(r,c)} style={{background :'red', pointerEvents: 'none'}}>
                                    {r + " " + c}
                                    </td>
                            :

                                    <td className="Tcol" key={i} onClick={() => this.selectedCol(r,c)} style={{background : colors && colors.length > 0 && colors[r] && colors[r][c] ? colors[r][c] : 'grey' }}>
                                    {r + " " + c}
                                    </td> )}
                        </tr>)}
                    </tbody>
                </table> */}
            </div>
        )
    }
}

export default ShortestPath;