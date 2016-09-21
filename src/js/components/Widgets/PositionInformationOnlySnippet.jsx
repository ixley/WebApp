import React, { Component, PropTypes } from "react";
import ReadMore from "../../components/Widgets/ReadMore";
import ViewSourceModal from "../../components/Widgets/ViewSourceModal";

export default class PositionInformationOnlySnippet extends Component {
  static propTypes = {
    ballot_item_display_name: PropTypes.string,
    is_on_ballot_item_page: PropTypes.bool,
    is_on_edit_position_modal: PropTypes.bool,
    is_looking_at_self: PropTypes.bool,
    more_info_url: PropTypes.string,
    speaker_display_name: PropTypes.string,
    statement_text: PropTypes.string,
    stance_display_off: PropTypes.bool,
    comment_text_off: PropTypes.bool
  };

  componentWillMount () {
    this.setState({
      showViewSourceModal: false,
      transitioning: false
    });
  }

  closeViewSourceModal () {
    this.setState({ showViewSourceModal: false });
  }

  openViewSourceModal (event) {
    console.log(event);
    event.stopPropagation();
    this.setState({ showViewSourceModal: true });
  }

  render () {
    var stance_icon_src;
    var className;
    var alt;
    var positionLabel;
    var hasThisToSay;
    var { is_looking_at_self } = this.props;
    var statement_text = this.props.statement_text || "";
    var statement_text_html = <ReadMore text_to_display={statement_text} />;
    // onViewSourceClick is onClick function for view source modal in mobile browser
    // const onViewSourceClick = this.state.showViewSourceModal ? this.closeViewSourceModal.bind(this) : this.openViewSourceModal.bind(this);

    stance_icon_src = "/img/global/icons/mixed-rating-icon.svg";
    className = "position-rating__icon position-rating__icon--mixed";
    alt = "Neutral Rating";
    positionLabel = "Information about";
    hasThisToSay = is_looking_at_self ? "Your comment is this:" : "has this to say:";
    let stance_display_off = false;
    if (this.props.stance_display_off !== undefined) {
      stance_display_off = this.props.stance_display_off ? true : false;
    }
    let comment_text_off = false;
    if (this.props.comment_text_off !== undefined) {
      comment_text_off = this.props.comment_text_off ? true : false;
    }

    return <div className="explicit-position">
      {stance_display_off ? null : <img src={stance_icon_src} width="20" height="20" className={className} alt={alt} />}
      <div className="explicit-position__text">
        { stance_display_off ?
          null :
          <span>
            {this.props.is_on_ballot_item_page ?
              <span>
                <span className="explicit-position__position-label">{positionLabel}</span>
                <span> {this.props.ballot_item_display_name} </span>
              </span> :
              <span>
                <span> {this.props.speaker_display_name} </span>
                <span className="explicit-position__position-label">{hasThisToSay}</span>
              </span> }
            <br />
          </span>
        }
        { comment_text_off ? null :
          <span>
            <span>{statement_text_html}</span>
            {/* if there's an external source for the explicit position/endorsement, show it */}
            {this.props.more_info_url ?
              <span className="explicit-position__source">
                {/* link for desktop browser: open in new tab*/}
                <a href={this.props.more_info_url}
                   className="interface-element--desktop"
                   target="_blank">
                  (view source)
                </a>
                {/* link for mobile browser: open in bootstrap modal */}
                {/*<a onClick={onViewSourceClick}
                   className="interface-element--mobile">
                  (view source)
                </a> */}
              </span> :
              null }
          </span>
        }
      </div>
      <ViewSourceModal show={this.state.showViewSourceModal}
                     onHide={this.closeViewSourceModal.bind(this)}
                     url={this.props.more_info_url} />
    </div>;
  }
}
