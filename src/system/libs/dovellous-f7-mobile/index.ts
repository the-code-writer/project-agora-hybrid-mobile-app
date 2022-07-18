import * as DovellousF7 from "./dovellous-f7-mobile";

/**
 * Framework7 Plugin Keypad 0.0.0
 * Keypad plugin extends Framework7 with additional custom keyboards
 * http://framework7.io/plugins/
 *
 * Copyright 2014-2022 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: April 19, 2022
 */

function DovellousClassConstructor(Framework7Class) {
    return class Dovellous extends Framework7Class {
        constructor(app, params) {
            super(params, [app]);

            const Utils = app.utils;
            const $ = app.$;
            const request = app.request;

            const dovellous = this;
            dovellous.app = app;

            const defaults = Utils.extend(
                {
                    on: {},
                },
                app.params.dovellous,
            );

            dovellous.params = Utils.extend(defaults, params);

            let $containerEl;

            if (dovellous.params.containerEl) {
                $containerEl = $(dovellous.params.containerEl);
                // eslint-disable-next-line
                if ($containerEl.length === 0) return dovellous;
            }

            if (!dovellous.params.buttons || dovellous.params.buttons.length === 0) {
                const { dotCharacter, dotButton } = dovellous.params;
                if (dovellous.params.type === 'numpad') {
                    dovellous.params.buttons = [
                        {
                            html: '<span class="dovellous-button-number">1</span><span class="dovellous-button-letters"></span>',
                            value: 1,
                        },
                        {
                            html: '<span class="dovellous-button-number">2</span><span class="dovellous-button-letters">ABC</span>',
                            value: 2,
                        },
                        {
                            html: '<span class="dovellous-button-number">3</span><span class="dovellous-button-letters">DEF</span>',
                            value: 3,
                        },
                        {
                            html: '<span class="dovellous-button-number">4</span><span class="dovellous-button-letters">GHI</span>',
                            value: 4,
                        },
                        {
                            html: '<span class="dovellous-button-number">5</span><span class="dovellous-button-letters">JKL</span>',
                            value: 5,
                        },
                        {
                            html: '<span class="dovellous-button-number">6</span><span class="dovellous-button-letters">MNO</span>',
                            value: 6,
                        },
                        {
                            html: '<span class="dovellous-button-number">7</span><span class="dovellous-button-letters">PQRS</span>',
                            value: 7,
                        },
                        {
                            html: '<span class="dovellous-button-number">8</span><span class="dovellous-button-letters">TUV</span>',
                            value: 8,
                        },
                        {
                            html: '<span class="dovellous-button-number">9</span><span class="dovellous-button-letters">WXYZ</span>',
                            value: 9,
                        },
                        {
                            html: dotButton
                                ? `<span class="dovellous-button-number">${dotCharacter}</span>`
                                : '',
                            value: dotButton ? dotCharacter : undefined,
                            dark: true,
                            cssClass: dotButton ? '' : 'dovellous-dummy-button',
                        },
                        {
                            html: '<span class="dovellous-button-number">0</span>',
                            value: 0,
                        },
                        {
                            html: '<i class="icon icon-dovellous-delete"></i>',
                            cssClass: 'dovellous-delete-button',
                            dark: true,
                        },
                    ];
                } else if (params.type === 'calculator') {
                    dovellous.params.buttons = [
                        {
                            html: '<span class="dovellous-button-number">C</span>',
                            value: 'C',
                            dark: true,
                        },
                        {
                            html: '<span class="dovellous-button-number">±</span>',
                            value: '±',
                            dark: true,
                        },
                        {
                            html: '<span class="dovellous-button-number">%</span>',
                            value: '%',
                            dark: true,
                        },
                        {
                            html: '<span class="dovellous-button-number">÷</span>',
                            value: '÷',
                            cssClass: 'calc-operator-button',
                        },
                        {
                            html: '<span class="dovellous-button-number">7</span>',
                            value: 7,
                        },
                        {
                            html: '<span class="dovellous-button-number">8</span>',
                            value: 8,
                        },
                        {
                            html: '<span class="dovellous-button-number">9</span>',
                            value: 9,
                        },
                        {
                            html: '<span class="dovellous-button-number">×</span>',
                            value: '×',
                            cssClass: 'calc-operator-button',
                        },
                        {
                            html: '<span class="dovellous-button-number">4</span>',
                            value: 4,
                        },
                        {
                            html: '<span class="dovellous-button-number">5</span>',
                            value: 5,
                        },
                        {
                            html: '<span class="dovellous-button-number">6</span>',
                            value: 6,
                        },
                        {
                            html: '<span class="dovellous-button-number">-</span>',
                            value: '-',
                            cssClass: 'calc-operator-button',
                        },
                        {
                            html: '<span class="dovellous-button-number">1</span>',
                            value: 1,
                        },
                        {
                            html: '<span class="dovellous-button-number">2</span>',
                            value: 2,
                        },
                        {
                            html: '<span class="dovellous-button-number">3</span>',
                            value: 3,
                        },
                        {
                            html: '<span class="dovellous-button-number">+</span>',
                            value: '+',
                            cssClass: 'calc-operator-button',
                        },
                        {
                            html: '<span class="dovellous-button-number">0</span>',
                            value: 0,
                            cssClass: 'dovellous-button-double',
                        },
                        {
                            html: '<span class="dovellous-button-number">.</span>',
                            value: dotCharacter,
                        },
                        {
                            html: '<span class="dovellous-button-number">=</span>',
                            value: '=',
                            cssClass: 'calc-operator-button calc-operator-button-equal',
                        },
                    ];
                }
            }

            let $inputEl;
            if (dovellous.params.inputEl) {
                $inputEl = $(dovellous.params.inputEl);
            }

            let view;
            if (dovellous.params.view) {
                view = dovellous.params.view;
            } else if ($inputEl && $inputEl.length) {
                view =
                    $inputEl.parents('.view').length &&
                    $inputEl.parents('.view')[0].f7View;
            } else {
                view = app.views.get($inputEl);
            }
            if (!view) view = app.views.main;

            Utils.extend(dovellous, {
                app,
                request,
                $containerEl,
                containerEl: $containerEl && $containerEl[0],
                inline: $containerEl && $containerEl.length > 0,
                $inputEl,
                inputEl: $inputEl && $inputEl[0],
                initialized: false,
                opened: false,
                view,
                url: dovellous.params.url,
                calcValues: [],
                calcOperations: [],
                lastWasNumber: false,
            });

            // Events
            function onInputClick() {
                dovellous.open();
            }
            function onInputFocus(e) {
                e.preventDefault();
            }
            function onHtmlClick(e) {
                const $targetEl = $(e.target);
                if (dovellous.isPopover()) return;
                if (!dovellous.opened) return;
                if ($targetEl.closest('[class*="backdrop"]').length) return;
                if ($inputEl && $inputEl.length > 0) {
                    if (
                        $targetEl[0] !== $inputEl[0] &&
                        $targetEl.closest('.sheet-modal, .dovellous-modal').length === 0
                    ) {
                        dovellous.close();
                    }
                } else if (
                    $(e.target).closest('.sheet-modal, .dovellous-modal').length === 0
                ) {
                    dovellous.close();
                }
            }
            Utils.extend(dovellous, {
                attachInputEvents() {
                    dovellous.$inputEl.on('click', onInputClick);
                    if (dovellous.params.inputReadOnly) {
                        dovellous.$inputEl.on('focus mousedown', onInputFocus);
                    }
                },
                detachInputEvents() {
                    dovellous.$inputEl.off('click', onInputClick);
                    if (dovellous.params.inputReadOnly) {
                        dovellous.$inputEl.off('focus mousedown', onInputFocus);
                    }
                },
                attachHtmlEvents() {
                    app.on('click', onHtmlClick);
                },
                detachHtmlEvents() {
                    app.off('click', onHtmlClick);
                },
            });

            function onButtonClick($buttonEl) {
                if ($buttonEl.length === 0) return;
                const button = dovellous.params.buttons[$buttonEl.index()];
                let buttonValue = button.value;
                let currentValue = dovellous.value;

                if (dovellous.params.type === 'numpad') {
                    if (typeof currentValue === 'undefined') currentValue = '';
                    if ($buttonEl.hasClass('dovellous-delete-button')) {
                        currentValue = currentValue.substring(0, currentValue.length - 1);
                    } else if (typeof buttonValue !== 'undefined') {
                        if (buttonValue === '.' && currentValue.indexOf('.') >= 0) {
                            buttonValue = '';
                        }
                        currentValue += buttonValue;
                    }
                    if (typeof currentValue !== 'undefined')
                        dovellous.setValue(currentValue);
                }
                if (dovellous.params.type === 'calculator') {
                    dovellous.calculator(button.value);
                    const $buttonsEl = dovellous.$el.find('.dovellous-buttons');
                    $buttonsEl
                        .find('.calc-operator-active')
                        .removeClass('calc-operator-active');
                    if (
                        $buttonEl.hasClass('calc-operator-button') &&
                        !$buttonEl.hasClass('calc-operator-button-equal')
                    ) {
                        $buttonEl.addClass('calc-operator-active');
                    }
                }
                dovellous.emit('local::buttonClick dovellousButtonClick', dovellous, button);
                if (button.onClick) {
                    button.onClick(dovellous, button);
                }
            }
            function handleClick(e) {
                const $buttonEl = $(e.target).closest('.dovellous-button');
                if (!$buttonEl.length) return;
                onButtonClick($buttonEl);
            }

            let $touchedButtonEl;
            let touchStarted;
            let touchMoved;
            let touchStartX;
            let touchStartY;
            const maxTouchDistance = 10;

            function handleTouchStart(e) {
                if (touchStarted || touchMoved) return;
                const $buttonEl = $(e.target).closest('.dovellous-button');
                if (!$buttonEl.length) {
                    return;
                }
                $touchedButtonEl = $buttonEl;
                touchStarted = true;
                touchStartX = e.targetTouches[0].pageX;
                touchStartY = e.targetTouches[0].pageY;
            }
            function handleTouchMove(e) {
                if (!touchStarted) return;
                const pageX = (e.targetTouches[0] || e.changedTouches[0]).pageX;
                const pageY = (e.targetTouches[0] || e.changedTouches[0]).pageY;
                if (
                    Math.abs(pageX - touchStartX) > maxTouchDistance ||
                    Math.abs(pageY - touchStartY) > maxTouchDistance
                ) {
                    touchMoved = true;
                }
            }
            function handleTouchEnd() {
                if (!touchStarted) return;
                if (touchMoved) {
                    touchStarted = false;
                    touchMoved = false;
                    return;
                }
                touchStarted = false;
                touchMoved = false;
                onButtonClick($touchedButtonEl);
            }

            dovellous.attachKeypadEvents = function attachKeypadEvents() {
                const $buttonsEl = dovellous.$el.find('.dovellous-buttons');

                if (app.support.touch) {
                    $buttonsEl.on(app.touchEvents.start, handleTouchStart);
                    app.on('touchmove', handleTouchMove);
                    app.on('touchend', handleTouchEnd);
                } else {
                    $buttonsEl.on('click', handleClick);
                }

                dovellous.detachKeypadEvents = function detachKeypadEvents() {
                    if (app.support.touch) {
                        $buttonsEl.off(app.touchEvents.start, handleTouchStart);
                        app.off('touchmove', handleTouchMove);
                        app.off('touchend', handleTouchEnd);
                    } else {
                        $buttonsEl.off('click', handleClick);
                    }
                };
            };

            if ($inputEl && $inputEl.length) {
                $inputEl[0].f7Keypad = Keypad;
            }
            if ($containerEl && $containerEl.length) {
                $containerEl[0].f7Keypad = Keypad;
            }

            dovellous.init();

            // eslint-disable-next-line
            return dovellous;
        }

        initInput() {
            const dovellous = this;
            if (!dovellous.$inputEl) return;
            if (dovellous.params.inputReadOnly) dovellous.$inputEl.prop('readOnly', true);
        }

        isPopover() {
            const dovellous = this;
            const { app, modal, params } = dovellous;
            if (params.openIn === 'sheet') return false;
            if (modal && modal.type !== 'popover') return false;

            if (!dovellous.inline && dovellous.inputEl) {
                if (params.openIn === 'popover') return true;
                if (app.device.ios) {
                    return !!app.device.ipad;
                }
                if (app.width >= 768) {
                    return true;
                }
            }
            return false;
        }

        calculator(value) {
            const dovellous = this;
            const operators = '+ - = × ÷ ± %'.split(' ');
            const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];
            const reset = 'C';
            const invert = '±';
            const perc = '%';
            function calc() {
                let toEval = '';
                for (let i = 0; i < dovellous.calcOperations.length; i += 1) {
                    let operation = dovellous.calcOperations[i];
                    // eslint-disable-next-line
                    if (
                        i === dovellous.calcOperations.length - 1 &&
                        operators.indexOf(operation) >= 0
                    ); else if (operation) {
                        if (operation === '.') {
                            operation = 0;
                        }
                        toEval += `${operation.toString()}`
                            .replace('×', '*')
                            .replace('÷', '/');
                    }
                }
                toEval = toEval.replace(/--/g, '+');
                // eslint-disable-next-line
                dovellous.setValue(eval.call(window, toEval));
            }
            if (!dovellous.value) dovellous.value = 0;
            if (value === reset) {
                dovellous.setValue(0);
                dovellous.calcValues = [];
                dovellous.calcOperations = [];
                return;
            }
            if (numbers.indexOf(value) >= 0) {
                if (value === '.') {
                    if (dovellous.lastWasNumber && dovellous.value.toString().indexOf('.') >= 0)
                        return;
                }
                if (
                    operators.indexOf(dovellous.calcValues[dovellous.calcValues.length - 1]) >=
                    0
                ) {
                    dovellous.setValue(value);
                } else {
                    dovellous.setValue(dovellous.value ? `${dovellous.value}${value}` : value);
                }
                dovellous.lastWasNumber = true;
            }
            if (operators.indexOf(value) >= 0) {
                if (value === invert) {
                    if (dovellous.value === '.') return;
                    dovellous.setValue(-1 * dovellous.value);
                    dovellous.lastWasNumber = true;
                } else if (value === perc) {
                    if (dovellous.calcOperations[dovellous.calcOperations.length - 2]) {
                        const percents = dovellous.value / 100;
                        dovellous.setValue(
                            dovellous.calcOperations[dovellous.calcOperations.length - 2] *
                            percents,
                        );
                    }
                    dovellous.lastWasNumber = true;
                } else {
                    const lastOperation =
                        dovellous.calcOperations[dovellous.calcOperations.length - 1];
                    if (value === '=') {
                        if (
                            dovellous.calcOperations[dovellous.calcOperations.length - 1] === '='
                        ) {
                            if (dovellous.calcOperations.length < 2) return;
                            dovellous.calcOperations.pop();
                            const val1 =
                                dovellous.calcOperations[dovellous.calcOperations.length - 2];
                            const val2 =
                                dovellous.calcOperations[dovellous.calcOperations.length - 1];
                            dovellous.calcOperations.push(val1);
                            dovellous.calcOperations.push(val2);
                        } else {
                            dovellous.calcOperations.push(dovellous.value);
                        }
                        dovellous.calcOperations.push('=');
                        calc();
                    } else if (['-', '+', '×', '÷', '='].indexOf(lastOperation) >= 0) {
                        if (lastOperation === '=') {
                            dovellous.calcOperations = [dovellous.value, value];
                        }
                        if (['-', '+', '×', '÷'].indexOf(lastOperation) >= 0) {
                            if (dovellous.lastWasNumber) {
                                if (
                                    ['-', '+'].indexOf(lastOperation) >= 0 &&
                                    ['×', '÷'].indexOf(value) >= 0
                                ) {
                                    dovellous.calcOperations.push(dovellous.value);
                                    dovellous.calcOperations.push(value);
                                } else {
                                    dovellous.calcOperations.push(dovellous.value);
                                    dovellous.calcOperations.push(value);
                                    calc();
                                }
                            } else {
                                dovellous.calcOperations[dovellous.calcOperations.length - 1] = value;
                            }
                        }
                    } else {
                        dovellous.calcOperations.push(dovellous.value);
                        dovellous.calcOperations.push(value);
                        calc();
                    }
                    dovellous.lastWasNumber = false;
                }
            }
            if (value !== invert && value !== perc) dovellous.calcValues.push(value);
        }

        formatValue(value) {
            const dovellous = this;
            if (dovellous.params.formatValue)
                return dovellous.params.formatValue.call(dovellous, value);
            return value;
        }

        setValue(value) {
            const dovellous = this;
            dovellous.updateValue(value);
        }

        getValue() {
            const dovellous = this;
            return dovellous.value;
        }

        updateValue(newValue) {
            const dovellous = this;
            dovellous.value = newValue;
            if (
                dovellous.params.valueMaxLength &&
                dovellous.value.length > dovellous.params.valueMaxLength
            ) {
                dovellous.value = dovellous.value.substring(0, dovellous.params.valueMaxLength);
            }
            dovellous.emit('local::change dovellousChange', dovellous, dovellous.value);
            if (dovellous.$inputEl && dovellous.$inputEl.length > 0) {
                dovellous.$inputEl.val(dovellous.formatValue(dovellous.value));
                dovellous.$inputEl.trigger('change');
            }
        }

        renderButtons() {
            const dovellous = this;
            let buttonsHTML = '';
            let buttonClass;
            let button;
            for (let i = 0; i < dovellous.params.buttons.length; i += 1) {
                button = dovellous.params.buttons[i];
                buttonClass = 'dovellous-button';
                if (button.dark) buttonClass += ' dovellous-button-dark';
                if (button.cssClass) buttonClass += ` ${button.cssClass}`;
                buttonsHTML += `<span class="${buttonClass}">${button.html || ''
                    }</span>`;
            }
            return buttonsHTML;
        }

        renderToolbar() {
            const dovellous = this;
            if (dovellous.params.renderToolbar)
                return dovellous.params.renderToolbar.call(dovellous, dovellous);

            const toolbarHtml = `
          <div class="toolbar">
            <div class="toolbar-inner">
              <div class="left"></div>
              <div class="right">
                <a href="#" class="link sheet-close popover-close">${dovellous.params.toolbarCloseText}</a>
              </div>
            </div>
          </div>
        `;
            return toolbarHtml.trim();
        }

        renderSheet() {
            const dovellous = this;
            if (dovellous.params.renderSheet)
                return dovellous.params.renderSheet.call(dovellous, dovellous);
            const { cssClass, toolbar } = dovellous.params;

            const sheetHtml = `
          <div class="sheet-modal dovellous dovellous-sheet dovellous-type-${dovellous.params.type
                } ${cssClass || ''}">
            ${toolbar ? dovellous.renderToolbar() : ''}
            <div class="sheet-modal-inner dovellous-buttons">
              ${dovellous.renderButtons()}
            </div>
          </div>
        `;

            return sheetHtml;
        }

        renderPopover() {
            const dovellous = this;
            if (dovellous.params.renderPopover)
                return dovellous.params.renderPopover.call(dovellous, dovellous);
            const { cssClass, toolbar } = dovellous.params;
            const popoverHtml = `
          <div class="popover dovellous-popover">
            <div class="popover-inner">
              <div class="dovellous dovellous-type-${dovellous.params.type} ${cssClass || ''
                }">
                ${toolbar ? dovellous.renderToolbar() : ''}
                <div class="dovellous-buttons">
                  ${dovellous.renderButtons()}
                </div>
              </div>
            </div>
          </div>
        `.trim();

            return popoverHtml;
        }

        renderInline() {
            const dovellous = this;
            if (dovellous.params.renderInline)
                return dovellous.params.renderInline.call(dovellous, dovellous);
            const { cssClass, toolbar } = dovellous.params;

            const inlineHtml = `
          <div class="dovellous dovellous-inline dovellous-type-${dovellous.params.type} ${cssClass || ''
                }">
            ${toolbar ? dovellous.renderToolbar() : ''}
            <div class="dovellous-buttons">
              ${dovellous.renderButtons()}
            </div>
          </div>
        `;

            return inlineHtml;
        }

        render() {
            const dovellous = this;
            const { params } = dovellous;
            if (params.render) return params.render.call(dovellous);
            if (!dovellous.inline) {
                let modalType = params.openIn;
                if (modalType === 'auto')
                    modalType = dovellous.isPopover() ? 'popover' : 'sheet';

                if (modalType === 'popover') return dovellous.renderPopover();
                if (modalType === 'sheet') return dovellous.renderSheet();
            }
            return dovellous.renderInline();
        }

        onOpen() {
            const dovellous = this;
            const { initialized, $el, app, $inputEl, inline, value, params } = dovellous;
            dovellous.opened = true;

            // Init main events
            dovellous.attachKeypadEvents();

            // Set value
            if (!initialized) {
                if (value) dovellous.setValue(value);
                else if (params.value) {
                    dovellous.setValue(params.value);
                }
            } else if (value) {
                dovellous.setValue(value);
            }

            // Extra focus
            if (!inline && $inputEl.length && app.theme === 'md') {
                $inputEl.trigger('focus');
            }

            dovellous.initialized = true;

            // Trigger events
            if ($el) {
                $el.trigger('dovellous:open', dovellous);
            }
            if ($inputEl) {
                $inputEl.trigger('dovellous:open', dovellous);
            }
            dovellous.emit('local::open dovellousOpen', dovellous);
        }

        onOpened() {
            const dovellous = this;
            if (dovellous.$el) {
                dovellous.$el.trigger('dovellous:opened', dovellous);
            }
            if (dovellous.$inputEl) {
                dovellous.$inputEl.trigger('dovellous:opened', dovellous);
            }
            dovellous.emit('local::opened dovellousOpened', dovellous);
        }

        onClose() {
            const dovellous = this;
            const app = dovellous.app;

            if (dovellous.$inputEl && app.theme === 'md') {
                dovellous.$inputEl.trigger('blur');
            }
            if (dovellous.detachKeypadEvents) {
                dovellous.detachKeypadEvents();
            }

            if (dovellous.$el) {
                dovellous.$el.trigger('dovellous:close', dovellous);
            }
            if (dovellous.$inputEl) {
                dovellous.$inputEl.trigger('dovellous:close', dovellous);
            }
            dovellous.emit('local::close dovellousClose', dovellous);
        }

        onClosed() {
            const dovellous = this;
            dovellous.opened = false;

            if (!dovellous.inline) {
                dovellous.app.utils.nextTick(() => {
                    if (dovellous.modal && dovellous.modal.el && dovellous.modal.destroy) {
                        if (!dovellous.params.routableModals) {
                            dovellous.modal.destroy();
                        }
                    }
                    delete dovellous.modal;
                });
            }
            if (dovellous.$el) {
                dovellous.$el.trigger('dovellous:closed', dovellous);
            }
            if (dovellous.$inputEl) {
                dovellous.$inputEl.trigger('dovellous:closed', dovellous);
            }
            dovellous.emit('local::closed dovellousClosed', dovellous);
        }

        open() {
            const dovellous = this;
            const { app, opened, inline, $inputEl, params } = dovellous;
            if (opened) return;

            if (inline) {
                dovellous.$el = app.$(dovellous.render());
                dovellous.$el[0].f7Keypad = dovellous;
                dovellous.$containerEl.append(dovellous.$el);
                dovellous.onOpen();
                dovellous.onOpened();
                return;
            }
            let modalType = params.openIn;
            if (modalType === 'auto') {
                modalType = dovellous.isPopover() ? 'popover' : 'sheet';
            }
            const modalContent = dovellous.render();

            const modalParams = {
                targetEl: $inputEl,
                scrollToEl: dovellous.params.scrollToInput ? $inputEl : undefined,
                content: modalContent,
                backdrop:
                    typeof dovellous.params.backdrop === 'undefined'
                        ? modalType !== 'sheet'
                        : dovellous.params.backdrop,
                on: {
                    open() {
                        const modal = this;
                        dovellous.modal = modal;
                        dovellous.$el =
                            modalType === 'popover' ? modal.$el.find('.dovellous') : modal.$el;
                        dovellous.$el[0].f7Keypad = dovellous;
                        dovellous.onOpen();
                    },
                    opened() {
                        dovellous.onOpened();
                    },
                    close() {
                        dovellous.onClose();
                    },
                    closed() {
                        dovellous.onClosed();
                    },
                },
            };
            if (dovellous.params.routableModals) {
                dovellous.view.router.navigate({
                    url: dovellous.url,
                    route: {
                        path: dovellous.url,
                        [modalType]: modalParams,
                    },
                });
            } else {
                dovellous.modal = app[modalType].create(modalParams);
                dovellous.modal.open();
            }
        }

        close() {
            const dovellous = this;
            const { opened, inline } = dovellous;
            if (!opened) return;
            if (inline) {
                dovellous.onClose();
                dovellous.onClosed();
                return;
            }
            if (dovellous.params.routableModals) {
                dovellous.view.router.back();
            } else {
                dovellous.modal.close();
            }
        }

        init() {
            const dovellous = this;
            dovellous.initInput();

            if (dovellous.inline) {
                dovellous.open();
                dovellous.emit('local::init dovellousInit', dovellous);
                return;
            }

            if (!dovellous.initialized && dovellous.params.value) {
                dovellous.setValue(dovellous.params.value);
            }

            // Attach input Events
            if (dovellous.$inputEl) {
                dovellous.attachInputEvents();
            }
            if (dovellous.params.closeByOutsideClick) {
                dovellous.attachHtmlEvents();
            }
            dovellous.emit('local::init dovellousInit', dovellous);
        }

        destroy() {
            const dovellous = this;
            if (dovellous.destroyed) return;
            const { $el } = dovellous;
            dovellous.emit('local::beforeDestroy dovellousBeforeDestroy', dovellous);
            if ($el) $el.trigger('dovellous:beforedestroy', dovellous);

            dovellous.close();

            // Detach Events
            if (dovellous.$inputEl) {
                dovellous.detachInputEvents();
            }
            if (dovellous.params.closeByOutsideClick) {
                dovellous.detachHtmlEvents();
            }

            if ($el && $el.length) delete dovellous.$el[0].f7Keypad;
            dovellous.app.utils.deleteProps(dovellous);
            dovellous.destroyed = true;
        }
    };
}

// eslint-disable-next-line
let debugEnabled = true;
let Dovellous;
const DovellousF7MobilePlugin = {
    name: 'dovellous',
    install() {
        const Framework7 = this;
        Dovellous = DovellousClassConstructor(Framework7.Class);
        Framework7.Dovellous = Dovellous;
    },
    params: {
        dovellous: {
            stateVarsHere: {},
        },
        debugger: false,
    },
    create() {
        const app = this;
        const $ = app.$;
        app.dF7Mobile = DovellousF7.F7Mobile;
        app.dLanguages = DovellousF7.Languages;
        app.dLanguageResource = DovellousF7.LanguageResource;
        app.dovellous = {
            get(plugin = 'dovellous') {
                let _plugin;
                switch (plugin) {
                    case 'languages': {
                        _plugin = DovellousF7.Languages;
                        break;
                    }
                    case 'language-resources': {
                        _plugin = DovellousF7.LanguageResource;
                        break;
                    }
                    case 'f7-mobile': {
                        _plugin = DovellousF7.F7Mobile;
                        break;
                    }
                    default: {
                        _plugin = DovellousF7.F7Mobile;
                        break;
                    }
                };
                return _plugin;
            }
        };
        app.debugger = {
            enable: function () {
              debugEnabled = true;
            },
            disable: function () {
              debugEnabled = false;
            },
          };
    },
    on: {
        init: () => {
            const app = this;
            if (app.params.debugger){
                debugEnabled = true;
            } 
            if (debugEnabled){
                console.log("app init");
            }
          },
          pageBeforeIn: function (page: any) {
            const $ = page.app.$;
            const appx = page.app;
            appx.dovellous.destroy();
            if (debugEnabled) console.log("pageBeforeIn", page);
          },
          pageAfterIn: function (page: any) {
            if (debugEnabled) console.log("pageAfterIn", page);
          },
          pageBeforeOut: function (page: any) {
            if (debugEnabled) console.log("pageBeforeOut", page);
          },
          pageAfterOut: function (page: any) {
            if (debugEnabled) console.log("pageAfterOut", page);
          },
          pageInit: function (page: any) {
            if (debugEnabled) console.log("pageInit", page);
          },
          pageBeforeRemove: function (page: any) {
            if (debugEnabled) console.log("pageBeforeRemove", page);
          },
    },
};

export { DovellousF7MobilePlugin as default };
