import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native'
import {UIHeader} from '../../components/index'
import {images, icons, colors} from '../../constants';


var TermOfUse = (props) => {
    return (
      <View style={{flex: 1}}>
        <UIHeader
          title="Term of Use"
          leftIcon="arrow-left"
          onPressLeftIcon={() => {
              props.navigation.goBack()
          }}
        />
        <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}>
          <Text style={{lineHeight: 25}}>
            Terms and Conditions{'\n'}
            Last updated: April 23, 2022{'\n'}
            Please read these terms and conditions carefully before using Our
            Service.{'\n'}
          </Text>
          <View style={styles.view}>
            <Text style={styles.title}>Interpretation</Text>
            <Text style={styles.content}>
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </Text>
          </View>

          <View style={styles.view}>
            <Text style={styles.title}>Definitions</Text>
            <Text style={styles.content}>
              For the purposes of these Terms and Conditions:{'\n\n'}* Application means
              the software program provided by the Company downloaded by You on
              any electronic device, named Lifewear.{'\n'}* Application Store means the
              digital distribution service operated and developed by Apple Inc.
              (Apple App Store) or Google Inc. (Google Play Store) in which the
              Application has been downloaded.{'\n'}* Affiliate means an entity that
              controls, is controlled by or is under common control with a
              party, where "control" means ownership of 50% or more of the
              shares, equity interest or other securities entitled to vote for
              election of directors or other managing authority.{'\n'}* Country refers
              to: Vietnam{'\n'}* Company (referred to as either "the Company", "We",
              "Us" or "Our" in this Agreement) refers to Lifewear.{'\n'}* Device means
              any device that can access the Service such as a computer, a
              cellphone or a digital tablet.{'\n'}* Service refers to the Application.{'\n'}
              * Terms and Conditions (also referred as "Terms") mean these Terms
              and Conditions that form the entire agreement between You and the
              Company regarding the use of the Service. This Terms and
              Conditions agreement has been created with the help of the Terms
              and Conditions Generator.{'\n'}* Third-party Social Media Service means
              any services or content (including data, information, products or
              services) provided by a third-party that may be displayed,
              included or made available by the Service.{'\n'}* You means the
              individual accessing or using the Service, or the company, or
              other legal entity on behalf of which such individual is accessing
              or using the Service, as applicable.{'\n'}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 8,
    },
    title: {
        fontSize: 20,
        color: colors.primary,
        textAlign: 'center',
        marginVertical: 10,
    },
    view: {
        marginVertical: 10,
    },
    content: {
        textAlign: 'justify',
        lineHeight: 25,
    },
})

export default TermOfUse