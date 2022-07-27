import React from 'react';
import {Pressable} from 'react-native';
import {propTypes, defaultProps} from './anchorForAttachmentsOnlyPropTypes';
import AttachmentView from '../AttachmentView';
import fileDownload from '../../libs/fileDownload';
import addEncryptedAuthTokenToURL from '../../libs/addEncryptedAuthTokenToURL';

class BaseAnchorForAttachmentsOnly extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDownloading: false,
        };
        this.processDownload = this.processDownload.bind(this);
    }

    /**
     * Initiate file downloading and update downloading flags
     *
     * @param {String} href
     * @param {String} fileName
     */
    processDownload(href, fileName) {
        this.setState({isDownloading: true});
        fileDownload(href, fileName).then(() => this.setState({isDownloading: false}));
    }

    render() {
        const href = addEncryptedAuthTokenToURL(this.props.href);

        return (
            <Pressable
                style={this.props.style}
                onPress={() => {
                    if (this.state.isDownloading) {
                        return;
                    }
                    this.processDownload(href, this.props.displayName);
                }}
            >
                <AttachmentView
                    sourceURL={href}
                    file={{name: this.props.displayName}}
                    shouldShowDownloadIcon
                    shouldShowLoadingSpinnerIcon={this.state.isDownloading}
                />
            </Pressable>
        );
    }
}

BaseAnchorForAttachmentsOnly.propTypes = propTypes;
BaseAnchorForAttachmentsOnly.defaultProps = defaultProps;
BaseAnchorForAttachmentsOnly.displayName = 'BaseAnchorForAttachmentsOnly';

export default BaseAnchorForAttachmentsOnly;
