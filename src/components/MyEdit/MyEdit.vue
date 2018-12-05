<template>
    <div class="editor" v-focus >
        <div class="textarea" ref="editor" @blur="getblur()" @focus="getfocus()" @click="editorstatus=false" contenteditable="true"></div>
        <div class="utils" ref="utils" v-show="utilsshow" @mousedown.stop="setclass($event)"  >
            <i class="bold" @mousedown="choseeditor('bold')"></i>
            <i class="italic" @mousedown="choseeditor('Italic')"></i>
            <i class="color"@mousedown.self="chosecolor()"><span class="sanj"></span>
                <div class="colorbox" v-show="colorstatus">
                    <div class="auto">自动</div>
                    <p>主题颜色</p>
                    <ul class="themecolor" @mousedown.stop="setcolor($event)">
                        <li v-for="it in themecolor" :style="'backgroundColor:'+it"></li>
                    </ul>
                    <p>标准颜色</p>
                    <ul class="staticcolor" @mousedown.stop="setcolor($event)">
                        <li v-for="it in staticcolor" :style="'backgroundColor:'+it"></li>
                    </ul>
                    <a href="#">其他颜色</a>
                </div>
            </i>
            <i class="link" @mousedown="choselink('CreateLink','http://www.51js.com')">
            </i>
        </div>
        <div class="linktool" v-show="linkeditor" ref="linkeditor">
             <div class="inner" contenteditable v-html="httplink" @input="innerCont=$event.target.innerHTML">
             </div>
             <i class="right" @mousedown="httplink=innerCont;setlink()"></i>
             <i class="wrong" @click="choseeditor('undo');linkeditor=false"></i>
        </div>
        
    </div>
</template>

<script>
export default {
  name: 'MyEdit',
  data () {
    return {
        utilsshow:false,
        toolbar:[
          'title',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'fontScale',
          'color',
          'ol',            
          'ul',            
          'blockquote',
          'code',        
          'table',
          'link',
          'image',
          'hr',
          'indent',
          'outdent',
          'alignment'
        ],
        editstatus:false,
        linkeditor:false,
        colorstatus:false,
        lastclass:'',
        httplink:'https://',
        innerCont:'',
        themecolor:['#FFFFFF','#000000','#E7E6E6','#44546A','#5A9BD5','#EE7D31','#A5A5A5','#FFBF03','#4572C4',  '#F2F2F2','#BFBFBF','#7F7F7F','#7F7F7F','#7F7F7F','#262626','#D6DCE4','#2D75B5','#1D4E79'],
        staticcolor:['#9B0001','#FF0100','#FFBF03','#FFFF03','#92D051','#00B050','#02B0F0','#0070C0','#002060']
    }
  },
  mounted() {
    // console.log(this.$refs.editor.childNodes)
  },
  methods: {
    getfocus () {
      this.utilsshow = true
    },
    getblur () {
        if(!this.editorstatus){
            this.utilsshow = false
        }
    },
    choseeditor (commandName,valueArgument) {
        this.$refs.editor.focus();
        console.log(valueArgument||null)
        document.execCommand(commandName,false,valueArgument||null)
        // document.execCommand("fontSize", true, 18);
        // document.execCommand('CreateLink',false,'http://www.51js.com');
       // editor.className+=" focus";
    },
    chosecolor () {
        this.$refs.editor.focus();
        this.colorstatus=!this.colorstatus;
    },
    choselink(commandName,valueArgument){
        var sText = document.getSelection();
        console.log(sText.anchorOffset,this.$refs.editor.innerText);
        if(sText.anchorOffset>0&&this.$refs.editor.innerText){
            this.$refs.editor.focus();
            // document.execCommand('BackColor',true,'skyblue');
            document.execCommand('insertHTML',true,`<a href class="selected" target="_blank">${sText}</a>`);
            var range=document.getSelection().getRangeAt(0).getBoundingClientRect();
            var offset=this.$refs.editor.getBoundingClientRect();
            this.linkeditor=true;
            var linkobj=this.$refs.linkeditor;
            linkobj.style.left=range.left-offset.x-37+'px';
            linkobj.style.top=range.top+range.height-offset.y+16+'px';
        }

        // document.execCommand('CreateLink',false,httplink);
    },
    setcolor(e) {
        this.$refs.editor.focus();
        var color=e.target.style.backgroundColor;
        this.choseeditor('ForeColor',color)
        this.$refs.editor.focus();
    },
    setlink(){
        console.log(document.getSelection());
        var textarea=document.getElementsByClassName('textarea')
        var select=textarea[0].getElementsByClassName('selected')[0];
        console.log(textarea,select);
        select.setAttribute("href",this.httplink);
        this.removeClass(select,'selected')
        this.linkeditor=false;
    },
    setclass(e){
        this.$refs.editor.focus();
        // console.log(document.getSelection());
        this.editorstatus=true;
        for(let it of (this.$refs.utils.children)){
            this.removeClass(it,"focus")
        }
        if(this.lastclass!=e.target.className){
            this.lastclass=e.target.className;
            this.addClass(e.target,"focus")
        }else{
            this.lastclass='';
        }
        console.log('color',e.target.className)
        if(!this.hasClass(e.target,'color')){
            this.colorstatus=false;
        }
    },
    hasClass(element,cName){        //检查class是否存在
        return !!element.className.match(new RegExp('(\\s|^)'+cName+'(\\s|$)'));
    },
    addClass(element,cName){        //添加一个class
        if(!this.hasClass(element,cName)){
            element.className +=' '+cName;
        }
    },
    removeClass(element,cName){        //移除一个class
        if(this.hasClass(element,cName)){
            element.className = element.className.replace(new RegExp('(\\s|^)'+cName+'(\\s|$)'),'');
        }
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin edit-icon($url, $hover,$focus, $content) {
    background-image: url("../../assets/"+$url+".png");
    &:hover{
        background-image: url("../../assets/"+$hover+".png");
        &:after{
            content: $content;
            position: absolute;
            bottom:-24px;
            width: 36px;
            height: 24px;
            -padding: 0 6px;
            text-align: center;
            line-height: 24px;
            font-style: normal;
            background: #FFFFFF;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
        }
    }
    &.focus{
        background-image: url("../../assets/"+$focus+".png");
    }
}
@mixin link-icon($url) {
    background-image: url("../../assets/"+$url+".png");
    background-size: cover;
}
.editor {
    position: relative;
    width:500px;
    height:120px;
    margin:30px auto;
    border:1px solid #bbb;
    .textarea{
        width: 100%;
        height: 100%;
        user-select: text;
        .selected{
            color: red;
        }
    }
    .utils{
        position: absolute;
        top:-10px;
        right:0;
        transform: translateY(-100%);
        width: 160px;
        height: 36px;
        padding: 0;
        background: #FFFFFF;
        box-shadow: 0 1px 6px 0 rgba(0,0,0,0.14);
        border-radius: 4px;
        i{
            width: 35px;
            height: 35px;
            margin: 0;
            display: inline-block;
            background-repeat: no-repeat;
            background-position: center;
            cursor: pointer;
            &.bold{
                @include edit-icon("ic_bold", "ic_bold_copy","ic_bold_copy2", "加粗");
            }
            &.italic{
                @include edit-icon("ic_italics", "ic_italics_copy","ic_italics_copy2", "斜体");
            }
            &.color{
                @include edit-icon("ic_colour", "ic_colour_copy","ic_colour_copy2", "颜色");
            }
            &.link{
                @include edit-icon("ic_img1", "ic_img1_copy","ic_img1_copy2", "链接");
            }
            .sanj{
                position: absolute;
                transform: translate(10px, 12px);
                width: 0;
                height: 0;
                border-width: 3px 3px;
                border-style: solid;
                border-color: transparent transparent #3A3F56 transparent;
            }
        }
    }
    .linktool{
        position: absolute;
        display: flex;
        flex-direction:row;
        align-items: center;
        justify-content: space-evenly;
        width: 320px;
        height: 50px;
        -padding-top: 10px;
        background: #FFFFFF;
        box-shadow: 0 1px 6px 0 rgba(0,0,0,0.14);
        border-radius: 4px;
        &:after{
            content: '';
            position: absolute;
            left: 37px;
            top:-7px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 8px 8px;
            border-color: #fff #fff transparent transparent;
            transform: rotate(-45deg);
            box-shadow: 1px -1px 2px rgba(0,0,0,0.14);
        }
        .inner{
            -display: inline-block;
            width: 220px;
            height: 36px;
            text-indent: 10px;
            line-height: 36px;
            text-align: left;
            background: #F1F1F1;
        }
         i{
            width: 35px;
            height: 35px;
            margin: 0;
            display: inline-block;
            background-repeat: no-repeat;
            background-position: center;
            cursor: pointer;
            &.right{
                @include link-icon("ic_right");
            }
            &.wrong{
                @include link-icon("ic_wrong");
            }
        }
    }
    .colorbox{
        position: absolute;
        top:40px;
        left:20px;
        width: 180px;
        height: 210px;
        padding: 12px 8px;
        background: #FBFBFB;
        border: 1px solid #E3E3E3;
        box-shadow: 0 1px 6px 0 rgba(0,0,0,0.14);
        border-radius: 4px;
        box-sizing:border-box;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #3A3E55;
        letter-spacing: 0;
        font-style: normal;
        .auto{
            background: #FFFFFF;
            border: 1px solid #C2C2C2;
        }
        .themecolor,.staticcolor{
            width: calc(16px*9);
            margin: auto;
            list-style: none;
            display: flex;
            flex-direction:row;
            flex-wrap: wrap;
            padding: 0;
            li{
                width: 14px;
                height: 15px;
                margin-bottom: 5px;
                border: 1px solid #E2E2E2;
            }
        }
        a{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #3A3E55;
            letter-spacing: 0;
            line-height: 25px;
        }
    }
}
</style>
