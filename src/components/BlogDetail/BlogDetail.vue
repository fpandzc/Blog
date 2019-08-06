<template>
    <div class="wrapper ">
      <h1>{{blogDetail.tittle}}</h1>
      <div class="blog-info">
        <span class="info-span">作者:{{blogDetail.author}}</span>
        <span class="info-span">创建时间:{{_getTime(blogDetail.createTime)}}</span>
        <span class="info-span">最近更新时间:{{_getTime(blogDetail.updateTime)}}</span>
      </div>
      <div class="blog-content" v-html="blogDetail.content"></div>
    </div>
</template>

<script>
  import marked from 'marked'
  import highlightJs from 'highlight.js'
  import {getTime} from '@/common/js/common'
  marked.setOptions({
    highlight: (code) => highlightJs.highlightAuto(code).value
  })
  export default {
    name: "BlogDetail",
    data () {
      return {
        blogDetail: {}
      }
    },
    created () {
      this.$http.get(`/api/blog/blogDetail?id=${this.$route.params.id}`).then(res => {
        this.blogDetail = res.data.data.blogDetail
        this.blogDetail.content = marked(this.blogDetail.content)
      })
    },
    methods: {
      _getTime (val) {
        return getTime(val)
      }
    }
  }
</script>

<style  scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .blog-content{
    padding: 0 200px;
  }
  .info-span {
    color: #c9c9c9;
    padding: 0 20px;
  }
  .wrapper >>> body{
    margin: 0 auto;
    font-family: "Microsoft YaHei", arial,sans-serif;
    color: #444444;
    line-height: 1;
    padding: 30px;
  }
  @media screen and (min-width: 768px) {
    .wrapper >>> body {
      width: 748px;
      margin: 10px auto;
    }
  }
  .wrapper >>> h1, h2, h3, h4 {
    color: #111111;
    font-weight: 400;
    margin-top: 1em;
  }

  .wrapper >>> h1, h2, h3, h4, h5 {
    font-family: Georgia, Palatino, serif;
  }
  .wrapper >>> h1, h2, h3, h4, h5, p , dl{
    margin-bottom: 16px;
    padding: 0;
  }
  .wrapper >>> h1 {
    font-size: 48px;
    line-height: 54px;
  }
  .wrapper >>> h2 {
    font-size: 36px;
    line-height: 42px;
  }
  .wrapper >>> h1, h2 {
    border-bottom: 1px solid #EFEAEA;
    padding-bottom: 10px;
  }
  .wrapper >>> h3 {
    font-size: 24px;
    line-height: 30px;
  }
  .wrapper >>> h4 {
    font-size: 21px;
    line-height: 26px;
  }
  .wrapper >>> h5 {
    font-size: 18px;
    line-height: 23px;
  }
  .wrapper >>> a {
    color: #0099ff;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }
  .wrapper >>> a:hover {
    text-decoration: none;
    color: #ff6600;
  }
  .wrapper >>> a:visited {
    /*color: purple;*/
  }
  .wrapper >>> ul, ol {
    padding: 0;
    padding-left: 24px;
    margin: 0;
    list-style: initial;
  }
  .wrapper >>> li {
    line-height: 24px;
  }
  .wrapper >>> p, ul, ol {
    font-size: 16px;
    line-height: 24px;
  }

  .wrapper >>> ol ol, ul ol {
    list-style-type: lower-roman;
  }

  .wrapper >>> code, pre {
    border-radius: 3px;
    background-color:#f7f7f7;
    color: inherit;
  }

  .wrapper >>> code {
    font-family: Consolas, Monaco, Andale Mono, monospace;
    margin: 0 2px;
  }

  .wrapper >>> pre {
    line-height: 1.7em;
    overflow: auto;
    padding: 6px 10px;
    border-left: 5px solid #6CE26C;
  }

  .wrapper >>> pre > code {
    border: 0;
    display: inline;
    max-width: initial;
    padding: 0;
    margin: 0;
    overflow: initial;
    line-height: inherit;
    font-size: .85em;
    white-space: pre;
    background: 0 0;

  }

  .wrapper >>> code {
    color: #666555;
  }

  .wrapper >>> aside {
    display: block;
    float: right;
    width: 390px;
  }
  .wrapper >>> blockquote {
    border-left:.5em solid #eee;
    padding: 0 0 0 2em;
    margin-left:0;
  }
  .wrapper >>> blockquote  cite {
    font-size:14px;
    line-height:20px;
    color:#bfbfbf;
  }
  .wrapper >>> blockquote cite:before {
    content: '\2014 \00A0';
  }

  .wrapper >>> blockquote p {
    color: #666;
  }
  .wrapper >>> hr {
    text-align: left;
    color: #999;
    height: 2px;
    padding: 0;
    margin: 16px 0;
    background-color: #e7e7e7;
    border: 0 none;
  }

  .wrapper >>> dl {
    padding: 0;
  }

  .wrapper >>> dl dt {
    padding: 10px 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: bold;
  }

  .wrapper >>> dl dd {
    padding: 0 16px;
    margin-bottom: 16px;
  }

  .wrapper >>> dd {
    margin-left: 0;
  }

  /* Code below this line is copyright Twitter Inc. */

  .wrapper >>> button, input, select, textarea {
    font-size: 100%;
    margin: 0;
    vertical-align: baseline;
    *vertical-align: middle;
  }
  .wrapper >>> button, input {
    line-height: normal;
    *overflow: visible;
  }
  .wrapper >>> button::-moz-focus-inner, input::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  .wrapper >>> button, input[type="button"], input[type="reset"], input[type="submit"] {
    cursor: pointer;
    -webkit-appearance: button;
  }
  .wrapper >>> input[type=checkbox], input[type=radio] {
    cursor: pointer;
  }
  /* override default chrome & firefox settings */
  .wrapper >>> input:not([type="image"]), textarea {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }

  .wrapper >>> input[type="search"] {
    -webkit-appearance: textfield;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }
  .wrapper >>> input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  .wrapper >>> label, input, select, textarea {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 13px;
    font-weight: normal;
    line-height: normal;
    margin-bottom: 18px;
  }
  .wrapper >>> input[type=checkbox], input[type=radio] {
    cursor: pointer;
    margin-bottom: 0;
  }
  .wrapper >>> input[type=text], input[type=password], textarea, select {
    display: inline-block;
    width: 210px;
    padding: 4px;
    font-size: 13px;
    font-weight: normal;
    line-height: 18px;
    height: 18px;
    color: #808080;
    border: 1px solid #ccc;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
  .wrapper >>> select, input[type=file] {
    height: 27px;
    line-height: 27px;
  }
  .wrapper >>>  textarea {
    height: auto;
  }
  /* grey out placeholders */
  .wrapper >>>  :-moz-placeholder {
    color: #bfbfbf;
  }
  .wrapper >>> ::-webkit-input-placeholder {
    color: #bfbfbf;
  }
  .wrapper >>>  input[type=text], input[type=password], select, textarea {
    -webkit-transition: border linear 0.2s, box-shadow linear 0.2s;
    -moz-transition: border linear 0.2s, box-shadow linear 0.2s;
    transition: border linear 0.2s, box-shadow linear 0.2s;
    -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  .wrapper >>> input[type=text]:focus, input[type=password]:focus, textarea:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
    -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
  }
  /* buttons */
  .wrapper >>>   button {
    display: inline-block;
    padding: 4px 14px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 13px;
    line-height: 18px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    background-color: #0064cd;
    background-repeat: repeat-x;
    background-image: -moz-linear-gradient(top, #049cdb, #0064cd);
    background-image: -ms-linear-gradient(top, #049cdb, #0064cd);
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #049cdb), color-stop(100%, #0064cd));
    background-image: -webkit-linear-gradient(top, #049cdb, #0064cd);
    background-image: -o-linear-gradient(top, #049cdb, #0064cd);
    background-image: linear-gradient(top, #049cdb, #0064cd);
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    border: 1px solid #004b9a;
    border-bottom-color: #003f81;
    -webkit-transition: 0.1s linear all;
    -moz-transition: 0.1s linear all;
    transition: 0.1s linear all;
    border-color: #0064cd #0064cd #003f81;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  }
  .wrapper >>> button:hover {
    color: #fff;
    background-position: 0 -15px;
    text-decoration: none;
  }
  .wrapper >>>  button:active {
    -webkit-box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  .wrapper >>>  button::-moz-focus-inner {
    padding: 0;
    border: 0;
  }
  .wrapper >>>  table {
    *border-collapse: collapse; /* IE7 and lower */
    border-spacing: 0;
    width: 100%;
  }
  .wrapper >>>  table {
    border: solid #ccc 1px;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    /*-webkit-box-shadow: 0 1px 1px #ccc;
    -moz-box-shadow: 0 1px 1px #ccc;
    box-shadow: 0 1px 1px #ccc;   */
  }
  .wrapper >>>  table tr:hover {
    background: #fbf8e9;
    -o-transition: all 0.1s ease-in-out;
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    -ms-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
  }
  .wrapper >>>  table td, .table th {
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }

  .wrapper >>> table th {
    background-color: #dce9f9;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#ebf3fc), to(#dce9f9));
    background-image: -webkit-linear-gradient(top, #ebf3fc, #dce9f9);
    background-image:    -moz-linear-gradient(top, #ebf3fc, #dce9f9);
    background-image:     -ms-linear-gradient(top, #ebf3fc, #dce9f9);
    background-image:      -o-linear-gradient(top, #ebf3fc, #dce9f9);
    background-image:         linear-gradient(top, #ebf3fc, #dce9f9);
    /*-webkit-box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;
    -moz-box-shadow:0 1px 0 rgba(255,255,255,.8) inset;
    box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;*/
    border-top: none;
    text-shadow: 0 1px 0 rgba(255,255,255,.5);
    padding: 5px;
  }

  .wrapper >>>  table td:first-child, table th:first-child {
    border-left: none;
  }

  .wrapper >>>  table th:first-child {
    -moz-border-radius: 6px 0 0 0;
    -webkit-border-radius: 6px 0 0 0;
    border-radius: 6px 0 0 0;
  }
  .wrapper >>>  table th:last-child {
    -moz-border-radius: 0 6px 0 0;
    -webkit-border-radius: 0 6px 0 0;
    border-radius: 0 6px 0 0;
  }
  .wrapper >>>  table th:only-child{
    -moz-border-radius: 6px 6px 0 0;
    -webkit-border-radius: 6px 6px 0 0;
    border-radius: 6px 6px 0 0;
  }
  .wrapper >>>  table tr:last-child td:first-child {
    -moz-border-radius: 0 0 0 6px;
    -webkit-border-radius: 0 0 0 6px;
    border-radius: 0 0 0 6px;
  }
  .wrapper >>>  table tr:last-child td:last-child {
    -moz-border-radius: 0 0 6px 0;
    -webkit-border-radius: 0 0 6px 0;
    border-radius: 0 0 6px 0;
  }

</style>
