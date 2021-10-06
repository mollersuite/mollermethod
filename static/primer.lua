--[[
    The GitHub primer color set.
    Taken from https://github.com/primer/primitives/blob/22e15240b18b7b18ab3193a759576fda8f611012/data/colors/themes/dark.ts

    ```js
    // where `colors` is the colors object from the above link
    function toRGB(h) {
        let r = 0, g = 0, b = 0
        r = "0x" + h[1] + h[2]
        g = "0x" + h[3] + h[4]
        b = "0x" + h[5] + h[6]  
        return "Color3.fromRGB("+ +r + "," + +g + "," + +b + ")"
    }

    copy(JSON.stringify(Object.fromEntries(Object.entries(colors).map(([k,v])=>[k,Array.isArray(v) ? v.map(toRGB) : toRGB(v)])), null, '\t').replaceAll('"', '').replaceAll(':', '=').replaceAll('[', '{').replaceAll(']','}'))
    ```
]] return {
    black = Color3.fromRGB(1, 4, 9),
    white = Color3.fromRGB(240, 246, 252),
    gray = {
        Color3.fromRGB(240, 246, 252), Color3.fromRGB(201, 209, 217),
        Color3.fromRGB(177, 186, 196), Color3.fromRGB(139, 148, 158),
        Color3.fromRGB(110, 118, 129), Color3.fromRGB(72, 79, 88),
        Color3.fromRGB(48, 54, 61), Color3.fromRGB(33, 38, 45),
        Color3.fromRGB(22, 27, 34), Color3.fromRGB(13, 17, 23)
    },
    blue = {
        Color3.fromRGB(202, 232, 255), Color3.fromRGB(165, 214, 255),
        Color3.fromRGB(121, 192, 255), Color3.fromRGB(88, 166, 255),
        Color3.fromRGB(56, 139, 253), Color3.fromRGB(31, 111, 235),
        Color3.fromRGB(17, 88, 199), Color3.fromRGB(13, 65, 157),
        Color3.fromRGB(12, 45, 107), Color3.fromRGB(5, 29, 77)
    },
    green = {
        Color3.fromRGB(175, 245, 180), Color3.fromRGB(126, 231, 135),
        Color3.fromRGB(86, 211, 100), Color3.fromRGB(63, 185, 80),
        Color3.fromRGB(46, 160, 67), Color3.fromRGB(35, 134, 54),
        Color3.fromRGB(25, 108, 46), Color3.fromRGB(15, 83, 35),
        Color3.fromRGB(3, 58, 22), Color3.fromRGB(4, 38, 15)
    },
    yellow = {
        Color3.fromRGB(248, 227, 161), Color3.fromRGB(242, 204, 96),
        Color3.fromRGB(227, 179, 65), Color3.fromRGB(210, 153, 34),
        Color3.fromRGB(187, 128, 9), Color3.fromRGB(158, 106, 3),
        Color3.fromRGB(132, 83, 6), Color3.fromRGB(105, 62, 0),
        Color3.fromRGB(75, 41, 0), Color3.fromRGB(52, 26, 0)
    },
    orange = {
        Color3.fromRGB(255, 223, 182), Color3.fromRGB(255, 198, 128),
        Color3.fromRGB(255, 166, 87), Color3.fromRGB(240, 136, 62),
        Color3.fromRGB(219, 109, 40), Color3.fromRGB(189, 86, 29),
        Color3.fromRGB(155, 66, 21), Color3.fromRGB(118, 45, 10),
        Color3.fromRGB(90, 30, 2), Color3.fromRGB(61, 19, 0)
    },
    red = {
        Color3.fromRGB(255, 220, 215), Color3.fromRGB(255, 193, 186),
        Color3.fromRGB(255, 161, 152), Color3.fromRGB(255, 123, 114),
        Color3.fromRGB(248, 81, 73), Color3.fromRGB(218, 54, 51),
        Color3.fromRGB(182, 35, 36), Color3.fromRGB(142, 21, 25),
        Color3.fromRGB(103, 6, 12), Color3.fromRGB(73, 2, 2)
    },
    purple = {
        Color3.fromRGB(237, 222, 255), Color3.fromRGB(226, 197, 255),
        Color3.fromRGB(210, 168, 255), Color3.fromRGB(188, 140, 255),
        Color3.fromRGB(163, 113, 247), Color3.fromRGB(137, 87, 229),
        Color3.fromRGB(110, 64, 201), Color3.fromRGB(85, 48, 152),
        Color3.fromRGB(60, 30, 112), Color3.fromRGB(39, 16, 82)
    },
    pink = {
        Color3.fromRGB(255, 218, 236), Color3.fromRGB(255, 190, 221),
        Color3.fromRGB(255, 155, 206), Color3.fromRGB(247, 120, 186),
        Color3.fromRGB(219, 97, 162), Color3.fromRGB(191, 75, 138),
        Color3.fromRGB(158, 54, 112), Color3.fromRGB(125, 36, 87),
        Color3.fromRGB(94, 16, 62), Color3.fromRGB(66, 6, 42)
    },
    coral = {
        Color3.fromRGB(255, 221, 210), Color3.fromRGB(255, 194, 178),
        Color3.fromRGB(255, 162, 139), Color3.fromRGB(247, 129, 102),
        Color3.fromRGB(234, 96, 69), Color3.fromRGB(207, 70, 45),
        Color3.fromRGB(172, 50, 32), Color3.fromRGB(135, 32, 18),
        Color3.fromRGB(100, 13, 4), Color3.fromRGB(70, 7, 1)
    }
}
