var c = document.querySelector("code");

var Caret = function() {
    function some(a, f, u) {
        if (u === void(0)) u = false;
        for (var i = 0, n = a.length, r; i < n; ++i) if ((r = f(a[i], i, n)) !== u) return r;
        return u;
    }

    function getOffset(c, co, cc) {
        var cto = co, cp;
        if (c.nodeType !== 3) co = 0, some(c.childNodes, function(x, i) {
            if (i === cto) return true;
            co += x.textContent.length;
            return false;
        });
        return c === cc || cc && !cc.contains(c) ? co : function get(c, co, cc) {
            var cp = c.parentNode;
            if (c !== cp.firstChild) some(cp.childNodes, function(x) {
                if (x === c) return true;
                co += x.textContent.length;
                return false;
            });
            return cc && cc !== cp && cc.contains(cp) ? get(cp, co, cc) : co;
        }(c, co, cc);
    }

    function setOffset(cc, co, set, tion) {
        var to = co, c = cc;
        some(cc.childNodes, function(x, i, n) {
            var l = x.textContent.length; c = x;
            if (tion) {
                if (to < l) return true;
                if (to !== l || i !== n - 1) to -= l;
            } else {
                if (to <= l) return true;
                to -= l;
            }
            return false;
        });
        return c === cc || c.nodeType === 3 ? (set(c, to), c) : c = setOffset(c, to, set, tion);
    }

    return { get: getOffset, set: setOffset };
}();

function getCaret(x) {
    var s = window.getSelection(), r = s.getRangeAt(0);

    return (x.contains(r.startContainer)) ? 
        [Caret.get(r.startContainer, r.startOffset, x), Caret.get(r.endContainer, r.endOffset, x)] : false;
}

function setCaret(ro, y) {
    var s = window.getSelection(), r;

    if (ro) {
        if (document.activeElement !== c)
            c.focus();

        s.removeAllRanges();

        r = document.createRange();

        Caret.set(y, ro[0], r.setStart.bind(r));

        if (ro[0] === ro[1])
            r.collapse(true);
        else
            Caret.set(y, ro[1], r.setEnd.bind(r));

        s.addRange(r);
    }
}