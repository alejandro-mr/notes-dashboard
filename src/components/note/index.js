import React, { Component } from 'react';

import './Note.css';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

    this.dragStart = this.dragStart.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
  }

  dragStart(e) {
    let selected = e.currentTarget;
    console.log(selected);
  }

  dragOver(e) {
    console.log('Drag over: ', e);
  }

  dragEnd(e) {
    console.log('Drag ended', e);
  }

  render() {
    return (
      <div className="Note"
        draggable="true"
        onDragStart={this.dragStart}
        onDragOver={this.dragOver}
        onDragEnd={this.dragEnd}
      >
          <p className="Content">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,           </p>
          <div className="Fold">
              <div className="FoldBg"></div>
          </div>
          <div className="Bg"></div>
      </div>
    );
 }
}

export default Note;
