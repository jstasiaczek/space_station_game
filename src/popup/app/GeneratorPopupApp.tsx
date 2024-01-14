import { FunctionalComponent } from 'preact'
import { Generator } from '../../state/slices/types'
import { IHtmlPopupAppProps } from '../HtmlPopup'
import './popups.scss'

export interface GeneratorPopupAppProps extends IHtmlPopupAppProps {
    generators: Generator[]
}

export const GeneratorPopupApp: FunctionalComponent<GeneratorPopupAppProps> = ({
    onClosePopup,
    generators
}) => {
    return <div className="popup popup800">
        <div className="popup_title">
            <div className="title">Generators</div>
            <div onClick={onClosePopup} className="close">X</div>
        </div>
        <ul>
            {generators.map(generator => <li key={generator.name}>{generator.name}</li>)}
        </ul>
    </div>
}
