/**
 * WordPress dependencies
 */
import { Component, findDOMNode } from '@wordpress/element';

const withHoverAreas = ( WrappedComponent ) => {
	class WithHoverAreasComponent extends Component {
		constructor() {
			super( ...arguments );
			this.state = {
				hoverArea: null,
			};
			this.onMouseLeave = this.onMouseLeave.bind( this );
			this.onMouseMove = this.onMouseMove.bind( this );
		}

		componentDidMount() {
			// Disable reason: We use findDOMNode to avoid unnecessary extra dom Nodes
			// eslint-disable-next-line react/no-find-dom-node
			this.container = findDOMNode( this );
			this.container.addEventListener( 'mousemove', this.onMouseMove );
			this.container.addEventListener( 'mouseleave', this.onMouseLeave );
		}

		componentWillUnmount() {
			this.container.removeEventListener( 'mousemove', this.onMouseMove );
			this.container.removeEventListener( 'mouseleave', this.onMouseLeave );
		}

		onMouseLeave() {
			if ( this.state.hoverArea ) {
				this.setState( { hoverArea: null } );
			}
		}

		onMouseMove( event ) {
			const { width, left, right } = this.container.getBoundingClientRect();

			let hoverArea = null;
			if ( ( event.clientX - left ) < width / 3 ) {
				hoverArea = 'left';
			} else if ( ( right - event.clientX ) < width / 3 ) {
				hoverArea = 'right';
			}

			if ( hoverArea !== this.state.hoverArea ) {
				this.setState( { hoverArea } );
			}
		}

		render() {
			const { hoverArea } = this.state;
			return (
				<WrappedComponent { ...this.props } hoverArea={ hoverArea } />
			);
		}
	}

	return WithHoverAreasComponent;
};

export default withHoverAreas;
