import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-closure-compiler-js';
export default {
    input: "./index.js",
    output: {
        file: './dist/index.js',
        format: 'es',
        banner: `/**
** Created by Double Dimos        
*/
        `
    },
    plugins: [
        babel({
            presets: [
                [
                    "env",
                    {
                        modules: false
                    }
                ]
            ],
            plugins: [
                'transform-object-rest-spread'
            ]
        }),
        resolve(),
        commonjs()
    ]
}