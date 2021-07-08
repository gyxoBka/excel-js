import { $ } from '@core/dom'
import { debounce } from '@core/utils';

export function resizeHandler(event, $root) {
    return new Promise(resolve => {
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        const type = $resizer.data.resize
        const sideProp = type === 'col' ? 'bottom' : 'right'
        let delta = 0;
        
        $resizer.css({
            opacity: 1,
            [sideProp]: '-5000px'
        })
        
        const resize = debounce(function(e) {
            if(type === 'row') {
                delta = e.pageY - coords.bottom
                $resizer.css({bottom: -delta +'px'})
                
                return
            }
            
            delta = e.pageX - coords.right
            $resizer.css({right: -delta +'px'})
            
        }, 25)
        
        document.onmousemove = e => {
            resize(e)
        }
        
        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
            
            $resizer.css({
                opacity: 0,
                right: 0,
                bottom: 0,
            }) 
            
            let value = 0
            
            if(type === 'col') {
                value = coords.width + delta
                $parent.css({
                    width: value + 'px'
                })
            
                const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
                cells.forEach(cell => cell.style.width = value + 'px')
            } else {
                value = coords.height + delta
                $parent.css({
                    height: value + 'px'
                })
            }
            
            resolve({
                value,
                type,
                id: $parent.data[type]
            })
        } 
    })
}