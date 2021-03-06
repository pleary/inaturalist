import React from "react";
import PropTypes from "prop-types";
import { MenuItem, DropdownButton } from "react-bootstrap";

import CheckboxRowContainer from "../containers/checkbox_row_container";
import SettingsItem from "./settings_item";
import PlaceAutocomplete from "../../../observations/identify/components/place_autocomplete";

/* global TIMEZONES */

const Account = ( {
  profile,
  handleCustomDropdownSelect,
  handleInputChange,
  handlePlaceAutocomplete,
  setModalState,
  sites
} ) => {
  const currentNetworkAffiliation = sites.filter( site => site.id === profile.site_id )[0];

  const createTimeZoneList = ( ) => (
    TIMEZONES.map( zone => <option value={zone.value} key={zone.value}>{zone.label}</option> )
  );

  const createLocaleList = ( ) => Object.keys( I18n.t( "locales" ) ).map(
    locale => (
      <option value={locale} key={locale}>
        {I18n.t( `locales.${locale}`, { locale } )}
      </option>
    )
  );

  const showNetworkLogo = ( id, logo ) => (
    <img
      className="inat-affiliation-logo margin-right-medium"
      alt={`inat-affiliation-logo-${id}`}
      src={logo}
    />
  );

  const showCurrentNetwork = id => (
    <div className="default-title-custom-dropdown network-min-height">
      {showNetworkLogo( id, currentNetworkAffiliation.icon_url )}
      <div className="text-muted inat-affiliation-title">
        {sites.filter( site => site.id === id )[0].name}
      </div>
    </div>
  );

  const createINatAffiliationList = ( ) => {
    const menuItems = sites.map( site => {
      const { id, name } = site;

      return (
        <MenuItem
          key={`inat-affiliation-logo-${id}`}
          eventKey={id}
          className="inat-affiliation-width"
        >
          <span className="flex-no-wrap">
            {showNetworkLogo( id, site.icon_url )}
            <div className="text-muted">{name}</div>
            {profile.site_id === id && <i className="fa fa-check blue-checkmark" aria-hidden="true" />}
          </span>
        </MenuItem>
      );
    } );

    // add a MenuItem divider between all the first and last items
    // using this instead of my own div because it's automatically styled
    // to be the same width as the menu
    return menuItems.map( ( e, i ) => (
      i < menuItems.length - 1 ? [e, <MenuItem divider key={`divider-${i.toString( )}`} />] : [e]
    ) ).reduce( ( a, b ) => a.concat( b ) );
  };

  return (
    <div className="row">
      <div className="col-md-5 col-sm-10">
        <h4>{I18n.t( "account" )}</h4>
        <SettingsItem header={I18n.t( "place_geo.geo_planet_place_types.Time_Zone" )} htmlFor="user_time_zone">
          <p className="text-muted">{I18n.t( "all_your_observations_will_default_this_time_zone" )}</p>
          <select id="user_time_zone" className="form-control inherit-width" value={profile.time_zone} name="time_zone" onChange={handleInputChange}>
            {createTimeZoneList( )}
          </select>
        </SettingsItem>
        <SettingsItem header={I18n.t( "language_slash_locale" )} htmlFor="user_locale">
          <p className="text-muted">{I18n.t( "language_slash_locale_description" )}</p>
          <select id="user_locale" className="form-control inherit-width" value={profile.locale} name="locale" onChange={handleInputChange}>
            {createLocaleList( )}
          </select>
        </SettingsItem>
        <SettingsItem header={I18n.t( "default_search_place" )} htmlFor="user_search_place_id">
          <p className="text-muted">{I18n.t( "default_search_place_description" )}</p>
          <PlaceAutocomplete
            resetOnChange={false}
            initialPlaceID={profile.search_place_id}
            bootstrapClear
            afterSelect={e => handlePlaceAutocomplete( e, "search_place_id" )}
          />
        </SettingsItem>
        <SettingsItem header={I18n.t( "privacy" )} htmlFor="user_prefers_no_tracking">
          <CheckboxRowContainer
            name="prefers_no_tracking"
            label={I18n.t( "views.users.edit.prefers_no_tracking_label" )}
          />
          <button type="button" className="btn btn-link btn-tracking" onClick={( ) => setModalState( { show: true } )}>
            <i className="fa fa-info-circle" />
            {` ${I18n.t( "learn_about_third_party_tracking" )}`}
          </button>
        </SettingsItem>
        <SettingsItem header={I18n.t( "danger_zone" )} htmlFor="user_delete_account">
          <p>
            <a href="/users/delete" id="user_delete_account">{I18n.t( "delete_your_account" )}</a>
          </p>
        </SettingsItem>
      </div>
      <div className="col-md-1" />
      <div className="col-md-5 col-sm-10">
        <SettingsItem header={I18n.t( "inaturalist_network_affiliation" )} htmlFor="user_site_id">
          <div className="stacked">
            <DropdownButton
              id="user_site_id"
              onSelect={e => handleCustomDropdownSelect( e, "site_id" )}
              title={showCurrentNetwork( profile.site_id )}
            >
              {createINatAffiliationList( )}
            </DropdownButton>
          </div>
          <p
            className="text-muted"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: I18n.t( "views.users.edit.inaturalist_network_affiliation_desc_html", {
                url: "https://www.inaturalist.org/sites/network"
              } )
            }}
          />
        </SettingsItem>
      </div>
    </div>
  );
};

Account.propTypes = {
  profile: PropTypes.object,
  handleCustomDropdownSelect: PropTypes.func,
  handleInputChange: PropTypes.func,
  handlePlaceAutocomplete: PropTypes.func,
  setModalState: PropTypes.func,
  sites: PropTypes.array
};

export default Account;
