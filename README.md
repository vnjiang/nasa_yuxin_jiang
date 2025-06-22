目前你的代码片段没有 README.md 文件，但这是必须的！

需要包含：

项目简介和功能亮点
这是一个使用nasa open api的每日天文图片和视频的应用，采用科幻沉浸式设计，搭配科幻效果剧情和简单动画，让用户更沉浸的感受天文，并且使用ai能总结详细信息，简化用户的阅读时间
本项目采用 React 前端 + Node.js/Express 后端分离架构，数据和图片均通过后端转发 NASA API 获取、


安装和运行步骤（前后端分别）
1. use git bash, clone from github

git clone https://github.com/vnjiang/nasa_yuxin_jiang.git
cd nasa_yuxin_jiang


2.本代码不含nasa api key和gemini api key，请去/backend/.env中your_API_kEY替换成自己的key
网址作为获取api参考
Nasa：https://api.nasa.gov/
Gemini：https://aistudio.google.com/apikey

3. backend和frontend文件夹里安装npm install


4.cd ../frontend
npm start和
cd backend
node index.js

本地开发和部署方法

主要技术栈

环境变量配置说明（如 NASA API key、Gemini API key）
本代码不含nasa api key和gemini api key，请去/backend/.env中your_API_kEY替换成自己的key
网址作为获取api参考
Nasa：https://api.nasa.gov/
Gemini：https://aistudio.google.com/apikey

部署后的访问链接（如果已部署）

 代码仓库与提交
需要将前端和后端代码上传到 GitHub（或其他公开代码平台）。



. 在线部署（部署到云端）
需要将你的前端和后端都部署到线上，比如：

前端：Vercel、Netlify、Render、Heroku 等

后端：Render、Heroku、Railway、Vercel Serverless 等

部署完成后，把访问链接（URL）写到 README.md，并在邮件中发给招聘方。





## 环境变量

1. 将 `/backend/.env.example` 复制为 `/backend/.env`
2. 填入你自己的 API KEY：
    ```
    NASA_API_KEY=your_nasa_api_key
    GEMINI_API_KEY=your_gemini_api_key
    ```
3. 没有 NASA Key？可以去 https://api.nasa.gov/ 免费申请。

