import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
    palette : {
        background: {
            default: '#FFFFFF',
        },
        primary: {
            main: '#FFFFFF',
        },
        secondary: {
            main: '#cfd8dc',
        },
        text: {
            primary: '#cfd8dc'
        }
    },
    typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
    },
    components: {
        MuiAppBar:{

        }
    }
});

export default theme;

/*
* palette: 调色板对象，包含主题中使用的颜色。

primary: 主要颜色。
secondary: 次要颜色。
error: 错误颜色。
warning: 警告颜色。
info: 信息颜色。
success: 成功颜色。
typography: 字体对象，包含文本样式相关的设置。

fontFamily: 字体系列，可以是一个字符串，也可以是一个数组。如果是数组，则字体系列之间的顺序由备用字体的优先级确定。
fontSize: 字体大小，可以是一个像素值或字符串。
fontWeightLight: 轻字重的字体权重值。
fontWeightRegular: 常规字体权重值。
fontWeightMedium: 中等字体权重值。
fontWeightBold: 粗字重的字体权重值。
components: 组件对象，包含 Material-UI 中各个组件的默认样式设置。

overrides: 覆盖对象，用于覆盖或修改组件的默认样式。

spacing: 间距对象，用于定义组件之间的间距大小。

shape: 形状对象，用于定义组件的形状。

props: 默认 props 对象，用于为组件提供默认的 props。
* */