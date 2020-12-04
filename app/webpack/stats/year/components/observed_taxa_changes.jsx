import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import SplitTaxon from "../../../shared/components/split_taxon";

const Deltas = ( { deltas, max } ) => {
  const maxDelta = max || _.max( deltas.map( d => d.delta ) );
  return (
    <div className="deltas">
      { deltas.map( d => (
        <div className="deltas-row" key={`${d.taxon.id}-${d.delta}`}>
          <div className="delta-taxon">
            <SplitTaxon taxon={d.taxon} />
          </div>
          <div className="delta">
            <div className="delta-bar" style={{ width: `${Math.abs( d.delta ) / maxDelta * 100}%` }}>
              { d.delta }
            </div>
          </div>
        </div>
      ) ) }
    </div>
  );
};

Deltas.propTypes = {
  deltas: PropTypes.array.isRequired,
  max: PropTypes.number
};

class ObservedTaxaChanges extends React.Component {
  constructor( props ) {
    super( props );
    this.state = { metric: "species" };
  }

  render( ) {
    const { data, year } = this.props;
    const max = _.max( data[this.state.metric].map( d => Math.abs( d.delta ) ) );
    return (
      <div className="ObservedTaxaChanges">
        <h3>
          <a id="taxa-changes" name="taxa-changes" href="#taxa-changes">
            <span>{ I18n.t( "views.stats.year.changes_in_taxa_observed" ) }</span>
          </a>
        </h3>
        <p>
          Gains and losses in taxa you observed both this year and last year.
        </p>
        <div className="metrics">
          <div className="fewer">
            <h4><span>{`Fewer in ${year}`}</span></h4>
            <Deltas deltas={_.filter( data[this.state.metric], d => d.delta < 0 )} max={max} />
          </div>
          <div className="more">
            <h4><span>{`More in ${year}`}</span></h4>
            <Deltas deltas={_.filter( data[this.state.metric], d => d.delta > 0 )} max={max} />
          </div>
        </div>
        <div className="metric-buttons btn-group" data-toggle="buttons">
          <button
            className={`btn btn-primary ${this.state.metric === "species" ? "active" : ""}`}
            type="button"
            onClick={() => this.setState( { metric: "species" } )}
          >
            { I18n.t( "species" ) }
          </button>
          <button
            className={`btn btn-primary ${this.state.metric === "observations" ? "active" : ""}`}
            type="button"
            onClick={() => this.setState( { metric: "observations" } )}
          >
            { I18n.t( "observations" ) }
          </button>
        </div>
      </div>
    );
  }
}

ObservedTaxaChanges.propTypes = {
  data: PropTypes.object,
  year: PropTypes.number
};

export default ObservedTaxaChanges;
