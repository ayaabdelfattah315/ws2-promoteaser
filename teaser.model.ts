import { ButtonModel } from '../../ui-core/interfaces/button.interface';
/** export */
/** TeaserModel */
export interface TeaserModel {
  /** wording */
  wording?: {
    /** title */
    title: string;
    /** body */
    body: string;
    /** imageUrlLg */
    imageUrlLg: string;
    /** imageUrlSm */
    imageUrlSm: string;
    /** imageUrlXmdm */
    imageUrlXmdm?: string;
    /** submitButton */
    submitButton?: ButtonModel;
    /** cancelButton */
    cancelButton?: ButtonModel;
    /** link */
    link?: ButtonModel;
    /**  */
    /** generalLink */
    generalLink?: ButtonModel;
    /** imageUrlMdm */
    imageUrlMdm?: string;
    /** oneLinkClass */
    oneLinkClass?: string;
    /** title */
    subtitle?: string;
    /** automationId */
    automationId?: string;
  };
  /** contentTheme */
  contentTheme?: string;
   /** contentPosition */
  contentPosition?: string;
    /** contentAlign */
  contentAlign?: string;
  /** contentWidth */
  contentWidth?: string;
  /** buttonsClass */
  buttonsClass?: string;
  /** submitButtonClasses */
  submitButtonClasses?: Array<string>;
  /** cancelButtonClasses */
  cancelButtonClasses?: Array<string>;
  /** coverType */
  coverType?: string;
  /** contentThemeSize */
  contentThemeSize?: string;
  /** hideBackBtn */
  hideBackBtn?: boolean;
  /** rightFloatText */
  rightFloatText?: boolean;
  /** isSideTextTeaser */
  isSideTextTeaser?: boolean;
  /** with Icon */
  withIcon?: string;
  /** with Icon cancel button */
  withIconCancelBtn?: string;
  /** separate the submit and cancel button */
  buttonSeparator?: boolean;
  /** fullWidth of all screen */
  fullWidth?: boolean;
  /** icon in middle of teaser */
  icon?: string;

}
/** contentTheme */
export enum contentTheme { light = 'bg-light', dark = 'bg-dark' }

/** coverType */
export enum coverType { crop = 'CROP', stretch = 'STRETCH' }
