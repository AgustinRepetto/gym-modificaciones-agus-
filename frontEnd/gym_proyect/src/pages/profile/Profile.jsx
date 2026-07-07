import { useEffect, useRef, useState } from "react";
import { useProfile } from "./useProfile"; 
import styles from "./Profile.module.css";

export function Profile() {
    const {
        userData,
        loading,
        password,
        setPassword,
        isSubmitting,
        showBanner,
        setShowBanner,
        showForm,
        setShowForm,
        handleSave,
        isDeleting,
        handleDeleteAccount,
        isEditing,
        setIsEditing,
        editUsername,
        setEditUsername,
        editPassword,
        setEditPassword,
        isUpdating,
        handleUpdateProfile,
        handleCancelEdit
    } = useProfile();

    const [profileImage, setProfileImage] = useState("");
    const fileInputRef = useRef(null);
    const [amountDue, setAmountDue] = useState(120.00);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [isProcessingMercado, setIsProcessingMercado] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("");
    const [paymentFormData, setPaymentFormData] = useState({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
        transferName: "",
        transferReference: "",
        transferEmail: ""
    });

    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);

    const handleProfileImageUpload = (event) => {
        const file = event.target?.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            if (typeof result === "string") {
                setProfileImage(result);
                localStorage.setItem("profileImage", result);
            }
        };
        reader.readAsDataURL(file);
    };

    const triggerImageUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const selectPaymentMethod = (method) => {
        setPaymentMethod(method);
        setPaymentStatus("");
        setPaymentFormData({
            cardName: "",
            cardNumber: "",
            expiry: "",
            cvc: "",
            transferName: "",
            transferReference: "",
            transferEmail: ""
        });
        setIsProcessingMercado(method === "mercado");
    };

    const handleCancelMercado = () => {
        setIsProcessingMercado(false);
        setPaymentMethod(null);
    };

    const handlePaymentInputChange = (field, value) => {
        setPaymentFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmitPayment = (e) => {
        e.preventDefault();

        if (paymentMethod === "tarjeta") {
            const { cardName, cardNumber, expiry, cvc } = paymentFormData;
            if (!cardName || !cardNumber || !expiry || !cvc) {
                alert("Por favor completa todos los datos de la tarjeta.");
                return;
            }
        }

        if (paymentMethod === "transferencia") {
            const { transferName, transferReference, transferEmail } = paymentFormData;
            if (!transferName || !transferReference || !transferEmail) {
                alert("Por favor completa todos los datos de la transferencia.");
                return;
            }
        }

        setPaymentStatus("Gracias por tu pago. (simulacion)");
        setAmountDue(0);
        setPaymentMethod(null);
        setIsProcessingMercado(false);
    };

    if (loading) {
        return <div style={{ color: '#fff', padding: '24px' }}>Cargando datos del perfil...</div>;
    }

    if (!userData) {
        return <div style={{ color: '#fff', padding: '24px' }}>Error al cargar el perfil. Reintenta loguearte.</div>;
    }


    return (
        <>
        {/* BANNER */}
            <div className={styles.profileContainer}>
                {showBanner && (
                    <div className={styles.warningBanner}>
                        <p>
                            <strong>¡Atención!</strong> Ingresaste con tu cuenta de Google.
                            Para poder iniciar sesión de forma tradicional te recomendamos configurar una contraseña por primera vez {" "}
                            <button 
                                type="button" 
                                className={styles.linkButton} 
                                onClick={() => setShowForm(true)}
                            >
                                aquí abajo.
                            </button>
                        </p>
                        <button 
                            type="button" 
                            className={styles.closeBannerBtn} 
                            onClick={() => setShowBanner(false)}
                        >
                            ✕
                        </button>
                    </div>
                )}
            </div>

            <main className={styles.mainContent}>
                <section className={styles.profileWrapper}>
                    <div className={styles.profileGrid}>
                        <article className={styles.profileCard}>
                            <div className={styles.profileHeader}>
                                <div>
                                    <p className={styles.profileLabel}>Bienvenido de nuevo</p>
                                    <h1>{userData.username || "Usuario"}</h1>
                                    <p className={styles.profileSubtitle}>Aquí puedes actualizar tu cuenta y administrar tus pagos.</p>
                                </div>
                                <div className={styles.avatarBlock}>
                                    <div className={styles.avatarWrapper}>
                                        <img
                                            src={profileImage || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMA..."}
                                            alt="profile_pic"
                                            className={styles.imgProfile}
                                        />
                                    </div>

                                    <button type="button" className={styles.uploadPhotoButton} onClick={triggerImageUpload}>
                                        Subir foto
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className={styles.fileInputHidden}
                                        onChange={handleProfileImageUpload}
                                    />
                                </div>
                            </div>

                            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                                <h2>Datos personales</h2>

                                <label>
                                    Nombre de usuario:
                                    <input
                                        type="text"
                                        value={isEditing ? editUsername : (userData.username || "")}
                                        onChange={(e) => setEditUsername(e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </label>

                                <label>
                                    Correo electrónico:
                                    <input type="email" value={userData.email || ""} disabled />
                                </label>

                                {isEditing && (
                                    <label>
                                        Nueva Contraseña:
                                        <input
                                            type="password"
                                            placeholder="Mínimo 8 caracteres"
                                            value={editPassword}
                                            onChange={(e) => setEditPassword(e.target.value)}
                                        />
                                    </label>
                                )}

                                <div className={styles.formActions}>
                                    {!isEditing ? (
                                        <>
                                            <button
                                                type="button"
                                                className={styles.btnPrimary}
                                                onClick={() => setIsEditing(true)}
                                            >
                                                Actualizar datos
                                            </button>
                                            <button
                                                type="button"
                                                className={styles.btnDanger}
                                                onClick={handleDeleteAccount}
                                                disabled={isDeleting || isSubmitting}
                                            >
                                                {isDeleting ? "Eliminando..." : "Eliminar cuenta"}
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                className={styles.btnPrimary}
                                                disabled={isUpdating}
                                                onClick={handleUpdateProfile}
                                            >
                                                {isUpdating ? "Guardando..." : "Guardar cambios"}
                                            </button>
                                            <button
                                                type="button"
                                                className={styles.btnSecondary}
                                                onClick={handleCancelEdit}
                                            >
                                                Cancelar
                                            </button>
                                        </>
                                    )}
                                </div>
                            </form>
                        </article>

                        <article className={styles.paymentCard}>
                            <div className={styles.paymentCardHeader}>
                                <div>
                                    <p className={styles.profileLabel}>Gestión de pagos</p>
                                    <h2>Pagos</h2>
                                </div>
                                <div className={styles.paymentAmount}>
                                    <span>Deuda</span>
                                    <strong>${amountDue.toFixed(2)}</strong>
                                </div>
                            </div>

                            <div className={styles.paymentMethods}>
                                <button
                                    type="button"
                                    className={`${styles.paymentMethodButton} ${paymentMethod === "mercado" ? styles.selectedMethod : ""}`}
                                    onClick={() => selectPaymentMethod("mercado")}
                                >
                                    Mercado Pago
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.paymentMethodButton} ${paymentMethod === "transferencia" ? styles.selectedMethod : ""}`}
                                    onClick={() => selectPaymentMethod("transferencia")}
                                >
                                    Transferencia
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.paymentMethodButton} ${paymentMethod === "tarjeta" ? styles.selectedMethod : ""}`}
                                    onClick={() => selectPaymentMethod("tarjeta")}
                                >
                                    Tarjeta
                                </button>
                            </div>

                            {paymentStatus && <div className={styles.paymentStatus}>{paymentStatus}</div>}

                            {paymentMethod === "mercado" && (
                                <div className={styles.mercadoPagoBox}>
                                    {isProcessingMercado ? (
                                        <>
                                            <div className={styles.loadingRow}>
                                                <div className={styles.spinner} />
                                                <span>Cargando Mercado Pago...</span>
                                            </div>
                                            <button
                                                type="button"
                                                className={styles.btnSecondary}
                                                onClick={handleCancelMercado}
                                            >
                                                Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        <p>Seleccioná un método de pago para continuar.</p>
                                    )}
                                </div>
                            )}

                            {(paymentMethod === "transferencia" || paymentMethod === "tarjeta") && (
                                <form className={styles.paymentForm} onSubmit={handleSubmitPayment}>
                                    <h3>
                                        {paymentMethod === "tarjeta"
                                            ? "Pagar con tarjeta"
                                            : "Pagar con transferencia"}
                                    </h3>

                                    {paymentMethod === "tarjeta" ? (
                                        <>
                                            <label>
                                                Nombre en la tarjeta:
                                                <input
                                                    type="text"
                                                    value={paymentFormData.cardName}
                                                    onChange={(e) => handlePaymentInputChange("cardName", e.target.value)}
                                                    placeholder="Nombre completo"
                                                />
                                            </label>
                                            <label>
                                                Número de tarjeta:
                                                <input
                                                    type="text"
                                                    value={paymentFormData.cardNumber}
                                                    onChange={(e) => handlePaymentInputChange("cardNumber", e.target.value)}
                                                    placeholder="XXXX XXXX XXXX XXXX"
                                                />
                                            </label>
                                            <div className={styles.splitInputs}>
                                                <label>
                                                    Vencimiento:
                                                    <input
                                                        type="text"
                                                        value={paymentFormData.expiry}
                                                        onChange={(e) => handlePaymentInputChange("expiry", e.target.value)}
                                                        placeholder="MM/AA"
                                                    />
                                                </label>
                                                <label>
                                                    CVC:
                                                    <input
                                                        type="text"
                                                        value={paymentFormData.cvc}
                                                        onChange={(e) => handlePaymentInputChange("cvc", e.target.value)}
                                                        placeholder="123"
                                                    />
                                                </label>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <label>
                                                Titular:
                                                <input
                                                    type="text"
                                                    value={paymentFormData.transferName}
                                                    onChange={(e) => handlePaymentInputChange("transferName", e.target.value)}
                                                    placeholder="Nombre del titular"
                                                />
                                            </label>
                                            <label>
                                                Referencia:
                                                <input
                                                    type="text"
                                                    value={paymentFormData.transferReference}
                                                    onChange={(e) => handlePaymentInputChange("transferReference", e.target.value)}
                                                    placeholder="Alias / CBU / CVU"
                                                />
                                            </label>
                                            <label>
                                                Email:
                                                <input
                                                    type="email"
                                                    value={paymentFormData.transferEmail}
                                                    onChange={(e) => handlePaymentInputChange("transferEmail", e.target.value)}
                                                    placeholder="tu@email.com"
                                                />
                                            </label>
                                        </>
                                    )}

                                    <div className={styles.paymentFormActions}>
                                        <button type="submit" className={styles.btnPrimary}>
                                            Pagar ahora
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.btnSecondary}
                                            onClick={() => setPaymentMethod(null)}
                                        >
                                            Volver
                                        </button>
                                    </div>
                                </form>
                            )}
                        </article>
                    </div>

                    {showForm && (
                        <div className={styles.passwordModalOverlay}>
                            <form className={styles.passwordForm} onSubmit={handleSave}>
                                <h3>Configurar Contraseña Local</h3>
                                <p>Crea una clave para poder ingresar sin depender de Google.</p>
                                
                                <label>
                                    Nueva Contraseña:
                                    <input 
                                        type="password" 
                                        placeholder="Mínimo 8 caracteres" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </label>

                                <div className={styles.modalActions}>
                                    <button 
                                        type="submit" 
                                        className={styles.btnEditProfile}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Guardando..." : "Confirmar Clave"}
                                    </button>
                                    <button 
                                        type="button" 
                                        className={styles.btnCancel} 
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}