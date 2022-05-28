import axios from "axios";
import { Component } from "react";
import AfterSubmitResponse from "./AfterSubmitResponse";
import { API_URL } from "./constants";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      submitted: false,
    };
    this.modules = {
      // 'syntax': true,
      'toolbar': [
        [{ 'font': [] }, { 'size': [] }],
        [ 'bold', 'italic', 'underline', 'strike' ],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'super' }, { 'script': 'sub' }],
        [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
        [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
        [ 'direction', { 'align': [] }],
        [ 'link', 'image', 'video', 'formula' ],
        [ 'clean' ]
  ],
  imageResize: {
    parchment: Quill.import('parchment'),
 }
}

    this.rteChange = this.rteChange.bind(this); 
    
  }
  rteChange = (content, delta, source, editor) => {
    let req = editor.getHTML();
    this.setState(
      {
        content : req,
      }
    );
    console.log(editor.getHTML() + typeof(req)); // rich text
    console.log(editor.getText()); // plain text
    console.log(editor.getLength()); // number of characters
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const { title, content } = this.state;
    let slug = title.replace(/ /g, "-");
    console.log(slug);
    console.log("title: ", title, "\nContent: ", content);
    // const token = localStorage.getItem('token');
    // let axiosConfig = {
    //   headers: {
    //     'Content-Type': 'application/json;charset=UTF-8',
    //     "Authorization": `Token ${token}`,
    //   }
    // };
    // const payload = { title, slug, content };
    // console.log(axiosConfig);
    // axios.post(`${API_URL}/posts/`, payload, axiosConfig).then((resp) => {
    //   console.log("response: ", resp);
    //   setTimeout(() => { this.setState({ submitted: true }) }, 1000);
    //   setTimeout(() => { document.getElementById('crtpost-btn').click() }, 3000);
    // }).catch((err) => {
    //   console.log("error: ", err);
    // })

  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    return (
      <>
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content post-modal">
            <div className="create-post">
              <form className="form-filling" onSubmit={this.handleSubmit}>
                <div className="txt_field">
                  <input type="text" name="title"
                    onChange={this.handleChange} placeholder="Title" required />
                </div>
                <br></br>
                {/* <div className="txt_field">
                <textarea name="content" rows="8" placeholder="Content" onChange={this.handleChange} required></textarea>
                </div> */}
                <div>
                  <ReactQuill theme="snow" modules={this.modules}
                    formats={this.formats} onChange={this.rteChange}
                    placeholder="Content goes here..."
                    />
                </div>
                <div className="txt_field">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
          {this.state.submitted && <AfterSubmitResponse msg="Your Post will be reviewed" />}
        </div>
      </>
    );
  }
}