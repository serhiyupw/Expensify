/* eslint-disable max-len */
export default {
    common: {
        cancel: 'Cancelar',
        yes: 'Si',
        no: 'No',
        ok: 'OK',
        attachment: 'Archivo adjunto',
        to: 'A',
        optional: 'Opcional',
        new: 'NUEVO',
        search: 'Buscar',
        next: 'Siguiente',
        goBack: 'Regresar',
        add: 'Agregar',
        resend: 'Reenviar',
        save: 'Guardar',
        saveChanges: 'Guardar cambios',
        password: 'Contraseña',
        profile: 'Perfil',
        payments: 'Pagos',
        preferences: 'Preferencias',
        view: 'Ver',
        not: 'No',
        signIn: 'Conectarse',
        continue: 'Continuar',
        firstName: 'Primer nombre',
        lastName: 'Apellido',
        phoneNumber: 'Número de teléfono',
        email: 'Email',
        and: 'y',
        details: 'Detalles',
        privacy: 'Intimidad',
        privacyPolicy: 'Política de privacidad',
        delete: 'Eliminar',
        deleted: 'eliminado',
        contacts: 'Contactos',
        recents: 'Recientes',
        close: 'Cerrar',
        download: 'Descargar',
        pin: 'Fijar',
        unPin: 'Desfijar',
        back: 'Volver',
        saveAndContinue: 'Guardar y continuar',
        settings: 'Configuración',
        termsOfService: 'Términos de servicio',
        people: 'Personas',
        invite: 'Invitación',
        here: 'aquí',
        dob: 'Fecha de Nacimiento',
        ssnLast4: 'Últimos 4 dígitos de su SSN',
        personalAddress: 'Dirección física personal',
        companyAddress: 'Dirección física de la empresa',
        noPO: '(No se aceptan apartados ni direcciones postales)',
        city: 'Ciudad',
        state: 'Estado',
        zip: 'Código postal',
        isRequiredField: 'es un campo obligatorio',
        whatThis: '¿Qué es esto?',
        iAcceptThe: 'Acepto los ',
        passwordCannotBeBlank: 'La contraseña no puede estar vacía',
        remove: 'Eliminar',
        admin: 'Administrador',
        dateFormat: 'AAAA-MM-DD',
        send: 'Enviar',
        notifications: 'Notificaciones',
        na: 'N/A',
        noResultsFound: 'No se han encontrado resultados',
        timePrefix: 'Son las',
        conjunctionFor: 'para',
        todayAt: 'Hoy a las',
        tomorrowAt: 'Mañana a las',
        yesterdayAt: 'Ayer a las',
        conjunctionAt: 'a',
        genericErrorMessage: 'Ups... algo no ha ido bien y la acción no se ha podido completar. Por favor inténtalo más tarde.',
    },
    attachmentPicker: {
        cameraPermissionRequired: 'Se necesita permiso para usar la cámara',
        expensifyDoesntHaveAccessToCamera: 'Esta aplicación no tiene acceso a tu cámara, por favor activa el permiso y vuelve a intentarlo.',
        attachmentError: 'Error al adjuntar archivo',
        errorWhileSelectingAttachment: 'Ha ocurrido un error al seleccionar un adjunto, por favor inténtalo de nuevo',
        errorWhileSelectingCorruptedImage: 'Ha ocurrido un error al seleccionar un adjunto corrupto, por favor intentalo con otro archivo',
        takePhoto: 'Hacer una foto',
        chooseFromGallery: 'Elegir de la galería',
        chooseDocument: 'Elegir documento',
        attachmentTooLarge: 'Archivo adjunto demasiado grande',
        sizeExceeded: 'El archivo adjunto supera el límite de 50 MB.',
    },
    textInputFocusable: {
        noExtentionFoundForMimeType: 'No se encontró una extension para este tipo de contenido',
        problemGettingImageYouPasted: 'Ha ocurrido un problema al obtener la imagen que has pegado',
    },
    baseUpdateAppModal: {
        updateApp: 'Actualizar app',
        updatePrompt: 'Existe una nueva versión de esta aplicación.\nActualiza ahora or reinicia la aplicación más tarde para recibir la última versión.',
    },
    iOUConfirmationList: {
        whoPaid: '¿QUIÉN PAGO?',
        whoWasThere: '¿QUIÉN ASISTIÓ?',
        whatsItFor: '¿Para qué es?',
    },
    iOUCurrencySelection: {
        selectCurrency: 'Selecciona una moneda',
        allCurrencies: 'TODAS LAS MONEDAS',
    },
    optionsSelector: {
        nameEmailOrPhoneNumber: 'Nombre, email o número de teléfono',
    },
    videoChatButtonAndMenu: {
        tooltip: 'Videollamada',
        zoom: 'Zoom',
        googleMeet: 'Google Meet',
    },
    hello: 'Hola',
    phoneCountryCode: '34',
    welcomeText: {
        phrase1: 'Con el Nuevo Expensify, chat y pagos son lo mismo.',
        phrase2: 'El dinero habla. Y ahora que chat y pagos están en un mismo lugar, es también fácil.',
        phrase3: 'Tus pagos llegan tan rápido como tus mensajes.',
        phrase4: '¡Bienvenido de vuelta al Nuevo Expensify! Por favor, introduce tu contraseña.',
    },
    reportActionCompose: {
        addAction: 'Acción',
        sendAttachment: 'Enviar adjunto',
        addAttachment: 'Agregar archivo adjunto',
        writeSomething: 'Escribe algo...',
        blockedFromConcierge: 'Comunicación no permitida',
        youAppearToBeOffline: 'Parece que estás desconectado.',
        fileUploadFailed: 'Subida fallida. El archivo no es compatible.',
        roomIsArchived: 'Esta sala de chat ha sido eliminada',
        localTime: ({user, time}) => `Son las ${time} para ${user}`,
        edited: '(editado)',
        emoji: 'Emoji',
    },
    reportActionContextMenu: {
        copyToClipboard: 'Copiar al portapapeles',
        copied: '¡Copiado!',
        copyLink: 'Copiar enlace',
        copyURLToClipboard: 'Copiar URL al portapapeles',
        markAsUnread: 'Marcar como no leído',
        editComment: 'Editar commentario',
        deleteComment: 'Eliminar comentario',
        deleteConfirmation: '¿Estás seguro de que quieres eliminar este comentario?',
    },
    reportActionsView: {
        beFirstPersonToComment: 'Sé el primero en comentar',
    },
    reportActionsViewMarkerBadge: {
        newMsg: ({count}) => `${count} mensaje${count > 1 ? 's' : ''} nuevo${count > 1 ? 's' : ''}`,
    },
    reportTypingIndicator: {
        isTyping: 'está escribiendo...',
        areTyping: 'están escribiendo...',
        multipleUsers: 'Varios usuarios',
    },
    sidebarScreen: {
        fabAction: 'Nuevo chat',
        newChat: 'Nuevo chat',
        newGroup: 'Nuevo grupo',
        headerChat: 'Chats',
        buttonSearch: 'Buscar',
        buttonMySettings: 'Mi configuración',
        fabNewChat: 'Nuevo chat',
    },
    iou: {
        amount: 'Importe',
        participants: 'Participantes',
        confirm: 'Confirmar',
        splitBill: 'Dividir factura',
        requestMoney: 'Pedir dinero',
        sendMoney: 'Enviar dinero',
        pay: 'Pagar',
        viewDetails: 'Ver detalles',
        settleExpensify: 'Pagar con Expensify',
        settleElsewhere: 'Voy a pagar de otra forma',
        decline: 'Rechazar',
        settlePaypalMe: 'Pagar con PayPal.me',
        settleVenmo: 'Pagar con Venmo',
        request: ({amount}) => `Solicitar ${amount}`,
        owes: ({manager, owner}) => `${manager} debe a ${owner}`,
        paid: ({owner, manager}) => `${manager} pagó a ${owner}`,
        split: ({amount}) => `Dividir ${amount}`,
        send: ({amount}) => `Enviar ${amount}`,
        choosePaymentMethod: 'Elige el método de pago:',
        noReimbursableExpenses: 'El monto de este informe es inválido',
        maxParticipantsReached: ({count}) => `Has seleccionado el número máximo (${count}) de participantes.`,
        error: {
            invalidAmount: 'Monto no válido',
            invalidSplit: 'La suma de las partes no equivale al monto total',
            other: 'Error inesperado, por favor inténtalo más tarde',
        },
    },
    reportDetailsPage: {
        notificationPreferencesDescription: 'Avisar sobre nuevos mensajes',
        always: 'Siempre',
        daily: 'Cada día',
        mute: 'Nunca',
        members: 'Miembros',
    },
    loginField: {
        addYourPhoneToSettleViaVenmo: 'Agrega tu número de teléfono para pagar usando Venmo.',
        numberHasNotBeenValidated: 'El número no está validado todavía. Haz click en el botón para reenviar el enlace de confirmación via SMS.',
        useYourPhoneToSettleViaVenmo: 'Usa tu número de teléfono para pagar usando Venmo.',
        emailHasNotBeenValidated: 'El email no está validado todavía. Haz click en el botón para reenviar el enlace de confirmación via email.',
    },
    avatarWithImagePicker: {
        uploadPhoto: 'Subir foto',
        removePhoto: 'Eliminar foto',
        editImage: 'Editar foto',
    },
    profilePage: {
        profile: 'Perfil',
        tellUsAboutYourself: '¡Cuéntanos algo sobre tí, nos encantaría conocerte!',
        john: 'Juan',
        doe: 'Nadie',
        preferredPronouns: 'Pronombres preferidos',
        selectYourPronouns: 'Selecciona tus pronombres',
        selfSelectYourPronoun: 'Auto-selecciona tu pronombre',
        emailAddress: 'Dirección de email',
        setMyTimezoneAutomatically: 'Configura mi zona horaria automáticamente',
        timezone: 'Zona horaria',
        growlMessageOnSave: 'Tu perfil se ha guardado correctamente',
    },
    addSecondaryLoginPage: {
        addPhoneNumber: 'Agregar número de teléfono',
        addEmailAddress: 'Agregar dirección de email',
        enterPreferredPhoneNumberToSendValidationLink: 'Escribe tu número de teléfono y contraseña para recibir el enlace de validación.',
        enterPreferredEmailToSendValidationLink: 'Escribe tu email y contraseña para recibir el enlace de validación.',
        sendValidation: 'Enviar validación',
    },
    initialSettingsPage: {
        about: 'Acerca de',
        aboutPage: {
            description: 'La nueva Expensify está creada por una comunidad de desarrolladores de código abierto de todo el mundo. Ayúdanos a construir el futuro de Expensify.',
            appDownloadLinks: 'Enlaces para descargar la App',
            viewTheCode: 'Ver codigo',
            viewOpenJobs: 'Ver trabajos disponibles',
            reportABug: 'Reporta un error',
        },
        appDownloadLinks: {
            android: {
                label: 'Android',
            },
            ios: {
                label: 'iOS',
            },
            desktop: {
                label: 'Desktop',
            },
        },
        signOut: 'Desconectar',
        versionLetter: 'v',
        changePassword: 'Cambiar contraseña',
        readTheTermsAndPrivacyPolicy: {
            phrase1: 'Leer los',
            phrase2: 'términos de servicio',
            phrase3: 'y',
            phrase4: 'política de privacidad',
        },
    },
    passwordPage: {
        changePassword: 'Cambiar contraseña',
        changingYourPasswordPrompt: 'El cambio de contraseña va a afectar tanto a la cuenta de Expensify.com\ncomo la de Nuevo Expensify.',
        currentPassword: 'Contraseña actual',
        newPassword: 'Nueva contraseña',
        newPasswordPrompt: 'La nueva contraseña tiene que ser diferente de la antigua, tener al menos 8 letras,\n1 letra mayúscula, 1 letra minúscula y 1 número.',
        confirmNewPassword: 'Confirma la nueva contraseña',
    },
    addPayPalMePage: {
        enterYourUsernameToGetPaidViaPayPal: 'Escribe tu nombre de usuario para que otros puedan pagarte a través de PayPal.',
        payPalMe: 'PayPal.me/',
        yourPayPalUsername: 'Tu usuario de PayPal',
        addPayPalAccount: 'Agregar cuenta de PayPal',
        growlMessageOnSave: 'Su nombre de usuario de PayPal se agregó correctamente',
        editPayPalAccount: 'Actualizar cuenta de PayPal',
    },
    paymentsPage: {
        paymentMethodsTitle: 'Métodos de pago',
    },
    paymentMethodList: {
        addPaymentMethod: 'Agrega método de pago',
        accountLastFour: 'Cuenta con terminación',
        cardLastFour: 'Tarjeta con terminacíon',
        addFirstPaymentMethod: 'Añade un método de pago para enviar y recibir pagos directamente desde la aplicación',
    },
    preferencesPage: {
        mostRecent: 'Más recientes',
        mostRecentModeDescription: 'Esta opción muestra por defecto todos los chats, ordenados a partir del más reciente, con los chats destacados arriba de todo.',
        focus: '#concentración',
        focusModeDescription: '#concentración – Muestra sólo los chats no leídos y destacados ordenados alfabéticamente.',
        receiveRelevantFeatureUpdatesAndExpensifyNews: 'Recibir noticias sobre Expensify y actualizaciones del producto',
        priorityMode: 'Modo prioridad',
        language: 'Idioma',
        languages: {
            english: 'Inglés',
            spanish: 'Español',
        },
    },
    signInPage: {
        expensifyDotCash: 'Nuevo Expensify',
        theCode: 'el código',
        openJobs: 'trabajos disponibles',
        heroHeading: 'Dividir cuentas\ny chatear con amigos.',
        heroDescription: {
            phrase1: 'El dinero habla. Y ahora que el chat y los pagos están en un solo lugar, también es fácil. Sus pagos le llegan tan rápido como puede transmitir su punto.',
            phrase2: 'New Expensify es de código abierto. Vista',
            phrase3: 'el código',
            phrase4: 'Vista',
            phrase5: 'vacantes',
        },
    },
    termsOfUse: {
        phrase1: 'Al iniciar sesión, estás accediendo a los',
        phrase2: 'términos de servicio',
        phrase3: 'y',
        phrase4: 'política de privacidad',
        phrase5: 'El envío de dinero es brindado por Expensify Payments LLC (NMLS',
        phrase6: 'ID:2017010) de conformidad con sus',
        phrase7: 'licencias',
    },
    passwordForm: {
        pleaseFillOutAllFields: 'Por favor completa todos los campos',
        enterYourTwoFactorAuthenticationCodeToContinue: 'Ingrese su código de autenticación de dos factores para continuar',
        forgot: '¿Te has olvidado?',
        twoFactorCode: 'Autenticación de 2 factores',
        requiredWhen2FAEnabled: 'Obligatorio cuando A2F está habilitado',
        error: {
            incorrectLoginOrPassword: 'Usuario o clave incorrectos. Por favor inténtalo de nuevo',
            twoFactorAuthenticationEnabled: 'Tienes autenticación de 2 factores activada en esta cuenta. Por favor conéctate usando su email o número de teléfono',
            invalidLoginOrPassword: 'Usuario o clave incorrectos. Por favor inténtalo de nuevo o resetea tu clave',
            unableToResetPassword: 'No pudimos cambiar tu clave. Probablemente porque el enlace para resetear la clave ha expirado. Te hemos enviado un nuevo enlace. Chequea tu bandeja de entrada y tu carpeta de Spam',
            noAccess: 'No tienes acceso a esta aplicación. Por favor agrega tu usuario de GitHub para acceder',
            accountLocked: 'Tu cuenta ha sido bloqueada tras varios intentos fallidos. Por favor inténtalo otra vez dentro de 1 hora',
            fallback: 'Ha ocurrido un error. Por favor inténtalo mas tarde',
        },
    },
    loginForm: {
        pleaseEnterEmailOrPhoneNumber: 'Por favor escribe un email o número de teléfono',
        phoneOrEmail: 'Número de teléfono o email',
    },
    resendValidationForm: {
        linkHasBeenResent: 'El enlace se ha reenviado',
        weSentYouMagicSignInLink: ({loginType}) => `Hemos enviado un enlace mágico de inicio de sesión a tu ${loginType}.`,
        resendLink: 'Reenviar enlace',
    },
    detailsPage: {
        localTime: 'Hora local',
    },
    newGroupPage: {
        createGroup: 'Crear grupo',
    },
    notFound: {
        chatYouLookingForCannotBeFound: 'El chat que estás buscando no se ha podido encontrar.',
        getMeOutOfHere: 'Sácame de aquí',
        iouReportNotFound: 'Los detalles del pago que estás buscando no se han podido encontrar.',
    },
    setPasswordPage: {
        enterPassword: 'Escribe una contraseña',
        confirmNewPassword: 'Confirma la contraseña',
        setPassword: 'Configura tu contraseña',
        passwordsDontMatch: 'Las contraseñas deben coincidir',
        newPasswordPrompt: 'Su contraseña debe tener al menos 8 caracteres, \n1 letra mayúscula, 1 letra minúscula, 1 número.',
        passwordFormTitle: '¡Bienvenido de vuelta al Nuevo Expensify! Por favor, elige una contraseña.',
    },
    bankAccount: {
        accountNumber: 'Número de cuenta',
        routingNumber: 'Número de ruta',
        addBankAccount: 'Agregar cuenta bancaria',
        chooseAnAccount: 'Elige una cuenta',
        logIntoYourBank: 'Inicie sesión en su banco',
        connectManually: 'Conectar manualmente',
        yourDataIsSecure: 'Tus datos estan seguros',
        toGetStarted: 'Para comenzar con la tarjeta Expensify, primero debe agregar una cuenta bancaria.',
        plaidBodyCopy: 'Ofrezca a sus empleados una forma más sencilla de pagar - y recuperar - los gastos de la empresa.',
        checkHelpLine: 'Su número de ruta y número de cuenta se pueden encontrar en un cheque para la cuenta.',
        hasPhoneLoginError: 'Para agregar una cuenta bancaria verificada, asegúrese de que su inicio de sesión principal sea un correo electrónico válido y vuelva a intentarlo. Puede agregar su número de teléfono como inicio de sesión secundario.',
        hasBeenThrottledError: ({fromNow}) => `Por razones de seguridad, nos tomamos un descanso de la configuración de la cuenta bancaria para que pueda verificar la información de su empresa. Inténtalo de nuevo ${fromNow}. ¡Lo siento!`,
        error: {
            noBankAccountAvailable: 'Lo sentimos, no hay ninguna cuenta bancaria disponible',
            taxID: 'Ingrese un número de identificación fiscal válido',
            website: 'Ingrese un sitio web válido',
            zipCode: 'Ingrese un código postal válido',
            addressStreet: 'Ingrese una calle de dirección válida que no sea un apartado postal',
            addressState: 'Por favor, selecciona un estado',
            incorporationDate: 'Ingrese una fecha de incorporación válida',
            incorporationState: 'Ingrese un estado de incorporación válido',
            industryCode: 'Ingrese un código de clasificación de industria válido',
            restrictedBusiness: 'Confirme que la empresa no está en la lista de negocios restringidos',
            routingNumber: 'Ingrese un número de ruta válido',
            companyType: 'Ingrese un tipo de compañía válido',
            tooManyAttempts: 'Debido a la gran cantidad de intentos de inicio de sesión, esta opción se ha desactivado temporalmente durante 24 horas. Vuelva a intentarlo más tarde o introduzca los detalles manualmente.',
            address: 'Ingrese una dirección válida',
            dob: 'Ingrese una fecha de nacimiento válida',
            ssnLast4: 'Ingrese los últimos 4 dígitos del número de seguro social',
            noDefaultDepositAccountOrDebitCardAvailable: 'Por favor agregue una cuenta bancaria para depósitos o una tarjeta de débito',
            existingOwners: {
                unableToAddBankAccount: 'No ha sido posible añadir la cuenta bancaria',
                alreadyInUse: 'La cuenta bancaria ya se encuentra en uso por ',
                pleaseAskThemToShare: 'Por favor, solicita que la compartan contigo.',
                alternatively: 'En su defecto, puedes ',
                setUpThisAccountByYourself: 'añadir la cuenta tú mismo',
                validationProcessAgain: ' y completar el proceso de validación de nuevo (lo cual puede tardar hasta una semana).',
            },
        },
    },
    addPersonalBankAccountPage: {
        enterPassword: 'Escribe tu contraseña de Expensify',
        alreadyAdded: 'Esta cuenta ya ha sido agregada.',
        chooseAccountLabel: 'Cuenta',
    },
    attachmentView: {
        unknownFilename: 'Archivo desconocido',
    },
    pronouns: {
        heHimHis: 'Él',
        sheHerHers: 'Ella',
        theyThemTheirs: 'Ellos',
        zeHirHirs: 'Ze/hir',
        selfSelect: 'Personalízalo',
        callMeByMyName: 'Llámame por mi nombre',
    },
    cameraPermissionsNotGranted: 'No has habilitado los permisos para acceder a la cámara',
    messages: {
        noPhoneNumber: 'Por favor escribe un número de teléfono que incluya el código de país e.g +447814266907',
        maxParticipantsReached: 'Has llegado al número máximo de participantes para un grupo.',
    },
    onfidoStep: {
        acceptTerms: 'Al continuar con la solicitud para activar su billetera Expensify, confirma que ha leído, comprende y acepta ',
        facialScan: 'Política y lanzamiento de la exploración facial de Onfido',
        tryAgain: 'Intentar otra vez',
        verifyIdentity: 'Verificar identidad',
        genericError: 'Hubo un error al procesar este paso. Inténtalo de nuevo.',
    },
    additionalDetailsStep: {
        headerTitle: 'Detalles adicionales',
        helpText: 'Necesitamos confirmar la siguiente información antes de que podamos procesar este pago.',
        helpLink: 'Obtenga más información sobre por qué necesitamos esto.',
        legalFirstNameLabel: 'Primer nombre legal',
        legalMiddleNameLabel: 'Segundo nombre legal',
        legalLastNameLabel: 'Apellido legal',
    },
    termsStep: {
        headerTitle: 'Condiciones y tarifas',
        haveReadAndAgree: 'He leído y acepto recibir ',
        electronicDisclosures: 'divulgaciones electrónicas',
        agreeToThe: 'Estoy de acuerdo con la ',
        walletAgreement: 'Acuerdo de billetera',
        enablePayments: 'Habilitar pagos',
        termsMustBeAccepted: 'Se deben aceptar los términos',
        feeAmountZero: '$0',
        monthlyFee: 'Cuota mensual',
        inactivity: 'Inactividad',
        electronicFundsInstantFee: '1.5%',
        electronicFundsInstantFeeMin: 'Mínimo $0.25',
        noOverdraftOrCredit: 'Sin función de sobregiro / crédito',
        electronicFundsWithdrawal: 'Retiro electrónico de fondos',
        instant: 'Instantáneo',
        standard: 'Estándar',
        shortTermsForm: {
            expensifyPaymentsAccount: 'La cuenta Expensify Payments es emitida por The Bancorp Bank.',
            perPurchase: 'Por compra',
            atmWithdrawal: 'Retiro de cajero automático',
            cashReload: 'Recarga de efectivo',
            inNetwork: 'En la red',
            outOfNetwork: 'fuera de la red',
            atmBalanceInquiry: 'Consulta de saldo de cajero automático',
            inOrOutOfNetwork: 'Dentro o fuera de la red',
            customerService: 'Servicio al cliente',
            automatedOrLive: 'Agente automatizado o en vivo',
            afterTwelveMonths: 'Después de 12 meses sin transacciones',
            weChargeOneFee: 'Cobramos 1 tipo de tarifa.',
            fdicInsurance: 'Sus fondos son elegibles para el seguro de la FDIC.',
            generalInfo: 'Para obtener información general sobre cuentas prepagas, visite',
            conditionsDetails: 'Encuentra detalles y condiciones para todas las tarifas y servicios visitando',
            conditionsPhone: 'o llamando al +1 833-400-0904.',
        },
        longTermsForm: {
            listOfAllFees: 'Todas las tarifas de la cuenta Expensify Payments:',
            typeOfFeeHeader: 'Tipo de tarifa',
            feeAmountHeader: 'Importe de la tarifa',
            moreDetailsHeader: 'Más detalles',
            openingAccountTitle: 'Abrir una cuenta',
            openingAccountDetails: 'No hay tarifa para crear una cuenta.',
            monthlyFeeDetails: 'No hay tarifa mensual',
            customerServiceTitle: 'Servicio al cliente',
            customerServiceDetails: 'No hay tarifas de servicio al cliente.',
            inactivityDetails: 'No hay tarifa de inactividad.',
            sendingFundsTitle: 'Enviar fondos a otro titular de cuenta',
            sendingFundsDetails: 'No se aplica ningún cargo por enviar fondos a otro titular de cuenta utilizando su '
                + 'saldo cuenta bancaria o tarjeta de débito',
            electronicFundsStandardDetails: 'No hay cargo por transferir fondos desde su cuenta Expensify Payments'
                + 'a su cuenta bancaria utilizando la opción estándar. Esta transferencia generalmente se completa en'
                + '1-3 negocios días.',
            electronicFundsInstantDetails: 'Hay una tarifa para transferir fondos desde su cuenta Expensify Payments a '
                + 'su tarjeta de débito vinculada utilizando la opción de transferencia instantánea. Esta transferencia'
                + ' generalmente se completa dentro de varios minutos. La tarifa es el 1.5% del monto de la '
                + 'transferencia (con una tarifa mínima de $ 0.25). ',
            fdicInsuranceBancorp: 'Sus fondos son elegibles para el seguro de la FDIC. Sus fondos se mantendrán en o '
                + 'transferido a The Bancorp Bank, una institución asegurada por la FDIC. Una vez allí, sus fondos '
                + 'están asegurados a $ 250,000 por la FDIC en caso de que The Bancorp Bank quiebre. Ver',
            fdicInsuranceBancorp2: 'para detalles.',
            contactExpensifyPayments: 'Comuníquese con Expensify Payments llamando al + 1833-400-0904, por correo'
                + 'electrónico a',
            contactExpensifyPayments2: 'o inicie sesión en',
            generalInformation: 'Para obtener información general sobre cuentas prepagas, visite',
            generalInformation2: 'Si tiene una queja sobre una cuenta prepaga, llame al Consumer Financial Oficina de '
                + 'Protección al 1-855-411-2372 o visite',
            printerFriendlyView: 'Ver versión para imprimir',
            automated: 'Automatizado',
            liveAgent: 'Agente en vivo',
        },
    },
    activateStep: {
        headerTitle: 'Habilitar pagos',
        activated: 'Su billetera Expensify está lista para usar.',
        checkBackLater: 'Todavía estamos revisando tu información. Por favor, vuelva más tarde.',
    },
    companyStep: {
        headerTitle: 'Información de la empresa',
        subtitle: 'Dé más información sobre su empresa.',
        legalBusinessName: 'Nombre comercial legal',
        companyWebsite: 'Página web de la empresa',
        taxIDNumber: 'Número de identificación fiscal',
        companyType: 'Tipo de empresa',
        incorporationDate: 'Fecha de incorporación',
        industryClassificationCode: 'Código de clasificación industrial',
        confirmCompanyIsNot: 'Confirmo que esta empresa no está en el',
        listOfRestrictedBusinesses: 'lista de negocios restringidos',
        incorporationDatePlaceholder: 'Fecha de inicio (aaaa-mm-dd)',
        companyPhonePlaceholder: '10 dígitos, sin guiones',
        confirmModalTitle: '¿Estás seguro?',
        confirmModalPrompt: 'Por favor, comprueba los campos resaltados e inténtalo de nuevo.',
        confirmModalConfirmText: 'OK',
    },
    requestorStep: {
        headerTitle: 'Información del solicitante',
        financialRegulations: 'Las leyes fiscales y el reglamento bancario nos obliga a verificar la identidad de todo individuo que desee añadir una cuenta bancaria representando a una compañía. ',
        learnMore: 'Más información',
        isMyDataSafe: '¿Están seguros mis datos?',
        onFidoConditions: 'Al continuar con la solicitud de añadir esta cuenta bancaria, confirma que ha leído, entiende y acepta ',
        onFidoFacialScan: 'Onfido’s Facial Scan Policy and Release',
        isControllingOfficer: 'Estoy autorizado a utilizar la cuenta bancaria de mi compañía para gastos de empresa',
        isControllingOfficerError: 'Debe ser un oficial controlador con autorización para operar la cuenta bancaria de la compañía',
    },
    validationStep: {
        headerTitle: 'Validar',
        buttonText: 'Finalizar configuración',
        maxAttemptError: 'Se ha inhabilitado la validación de esta cuenta bancaria, debido a demasiados intentos incorrectos. Por favor contáctenos.',
        description: 'Uno o dos días después de agregar su cuenta a Expensify, enviamos tres (3) transacciones a su cuenta. Tienen una línea comercial como "Expensify, Inc. Validation"',
        descriptionCTA: 'Ingrese el monto de cada transacción en los campos a continuación. Ejemplo: 1.51',
        reviewingInfo: '¡Gracias! Estamos revisando tu información y nos comunicaremos contigo en breve. Consulte su chat con Concierge ',
        forNextSteps: ' para conocer los próximos pasos para terminar de configurar su cuenta bancaria.',
    },
    beneficialOwnersStep: {
        beneficialOwners: 'Beneficiario efectivo',
        additionalInformation: 'Información adicional',
        checkAllThatApply: '(marca todos los que apliquen, en caso de que ninguno aplique dejar en blanco)',
        iOwnMoreThan25Percent: 'Soy dueño de mas de 25% de ',
        someoneOwnsMoreThan25Percent: 'Otra persona es dueña de mas de 25% de ',
        additionalOwner: 'Beneficiario efectivo adicional',
        removeOwner: 'Eliminar este beneficiario efectivo',
        addAnotherIndividual: 'Agregar otra persona que es dueña de mas de 25% de ',
        agreement: 'Acuerdo:',
        termsAndConditions: 'Términos y condiciones',
        certifyTrueAndAccurate: 'Certifico que la información dada es correcta',
        error: {
            termsAndConditions: 'Debe aceptar términos y condiciones',
            certify: 'Debe certificar que la información es verdadera y precisa',
        },
    },
    vbaLoadingAnimation: {
        oneMoment: 'Un Momento',
        explanationLine: 'Estamos verificando tu información y podrás continuar con los siguientes pasos en unos momentos.',
    },
    session: {
        offlineMessageRetry: 'Parece que estás desconectado. Por favor chequea tu conexión e inténtalo otra vez',
        offlineMessage: 'Parece que estás desconectado.',
    },
    workspace: {
        common: {
            card: 'Tarjeta Expensify',
            workspace: 'Espacio de trabajo',
        },
        new: {
            newWorkspace: 'Nuevo espacio de trabajo',
            getTheExpensifyCardAndMore: 'Consigue la Tarjeta Expensify y más',
            genericFailureMessage: 'Se ha producido un error al intentar crear el espacio de trabajo. Por favor, inténtalo de nuevo.',
        },
        people: {
            assignee: 'Persona asignada',
            genericFailureMessage: 'Se ha producido un error al intentar eliminar a un usuario del espacio de trabajo. Por favor inténtalo más tarde.',
            removeMembersPrompt: '¿Estás seguro que quieres eliminar a las personas seleccionadas de tu espacio de trabajo?',
            removeMembersTitle: 'Eliminar miembros',
        },
        card: {
            addEmail: 'Agregar correo electrónico',
            tagline: 'La tarjeta corporativa más inteligente de la habitación.',
            publicCopy: 'Para utilizar la Tarjeta Expensify debe utilizar el dominio privado de su empresa. Continúe y agregue su dirección de correo electrónico privada como inicio de sesión secundario.',
            privateCopy: 'Simplemente deslice su Tarjeta Expensify y sus gastos estarán listos, ¡es así de simple!',
            getStarted: 'Empezar',
            finishSetup: 'Finalizar configuración',
            manageCards: 'Administrar tarjetas',
            cardReadyTagline: 'Tus tarjetas Expensify están listas para usar!',
        },
        invite: {
            invitePeople: 'Invitar a la gente',
            invitePeoplePrompt: 'Invita a tus compañeros a tu espacio de trabajo.',
            personalMessagePrompt: 'Agregar un mensaje personal (Opcional)',
            enterEmailOrPhone: 'Correos electrónicos o números de teléfono',
            EmailOrPhonePlaceholder: 'Introduce una lista de correos electrónicos o números de teléfono separado por comas',
            pleaseEnterValidLogin: 'Asegúrese de que el correo electrónico o el número de teléfono sean válidos (e.g. +15005550006).',
            pleaseEnterUniqueLogin: 'Ese usuario ya es miembro de este espacio de trabajo.',
            genericFailureMessage: 'Se produjo un error al invitar al usuario al espacio de trabajo. Vuelva a intentarlo..',
            systemUserError: ({email}) => `Lo sentimos, no puedes invitar a ${email} a un espacio de trabajo.`,
            welcomeNote: ({workspaceName}) => `¡Has sido invitado a la ${workspaceName} Espacio de trabajo! Descargue la aplicación móvil Expensify para comenzar a rastrear sus gastos.`,
        },
        editor: {
            title: 'Editar espacio de trabajo',
            nameInputLabel: 'Nombre',
            nameInputHelpText: 'Este es el nombre que verás en tu espacio de trabajo.',
            save: 'Guardar',
            genericFailureMessage: 'Se produjo un error al guardar el espacio de trabajo. Por favor, inténtalo de nuevo.',
            avatarUploadFailureMessage: 'No se pudo subir el avatar. Por favor, inténtalo de nuevo.',
        },
        error: {
            growlMessageInvalidPolicy: '¡Espacio de trabajo no válido!',
        },
    },
    requestCallPage: {
        requestACall: 'Llámame por teléfono',
        description: '¿Necesitas ayuda configurando tu cuenta? Nuestro equipo de guías puede ayudarte.',
        instructions: 'Escribe tu nombre y número de teléfono y te llamaremos.',
        availabilityText: '*Nuestros guías están disponibles de domingo desde las 17.00 CT a viernes hasta las 17.00 CT. Si solicitas una llamada fuera de este horario, te llamaremos de lunes a viernes de 9.00 a 17.00 en tu hora local. El orden de llamada corresponde con el orden de solicitud.',
        callMe: 'Llámame',
        growlMessageOnSave: 'Llamada solicitada.',
        growlMessageInvalidPhone: 'El teléfono no es valido. Intentalo de nuevo agregando el código de país. P. ej.: +15005550006',
        growlMessageEmptyName: 'Por favor ingresa tu nombre completo',
        growlMessageNoPersonalPolicy: 'No he podido encontrar una póliza personal con la que asociar esta llamada a las Guías, compruebe su conexión e inténtelo de nuevo.',
        needHelp: 'Ayuda',
        needHelpTooltip: 'Recibe ayuda telefónica de nuestro equipo',
    },
};
